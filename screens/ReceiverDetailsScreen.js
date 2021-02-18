import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class ReceiverDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      recieverId: this.props.navigation.getParam('details')['userId'],
      requestId: this.props.navigation.getParam('details')['requestId'],
      itemName: this.props.navigation.getParam('details')['bookName'],
      reasonForRequesting: this.props.navigation.getParam('details')[
        'reasonToRequest'
      ],
      recieverName: '',
      recieverContact: '',
      recieverAddress: '',
      recieverRequestDocId: '',
    };
  }

  getRecieverDetails() {
    db.collection('users')
      .where('emailId', '==', this.state.recieverId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            recieverName: doc.data().first_name,
            recieverContact: doc.data().contact,
            recieverAddress: doc.data().address,
          });
        });
      });

    db.collection('requested_items')
      .where('requestId', '==', this.state.requestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({ recieverRequestDocId: doc.id });
        });
      });
  }

  componentDidMount() {
    this.getRecieverDetails();
  }

  updateItemStatus = () => {
    db.collection('all_donations').add({
      itemName: this.state.itemName,
      requestId: this.state.requestId,
      requestedBy: this.state.recieverName,
      donorId: this.state.userId,
      requestStatus: 'Donor Interested',
    });
  };

  addNotification = () => {
    var message = this.state.userName + " has shown interest in donating the book"
    db.collection("all_notifications").add({
      "targeted_user_id": this.state.recieverId,
      "donor_id": this.state.userId,
      "request_id": this.state.requestId,
      "item_name": this.state.itemName,
      "date": firebase.firestore.FieldValue.serverTimestamp(),
      "notification_status": "unread",
      "message": message
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.3 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#696969"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: 'Donate Items',
              style: { color: '#90A5A9', fontSize: 20, fontWeight: 'bold' },
            }}
            backgroundColor="#eaf8fe"
          />

          <Card title={'Receiver Information'} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Name : {this.state.itemName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Reason : {this.state.reasonForRequesting}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Name: {this.state.recieverName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Contact: {this.state.recieverContact}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: 'bold' }}>
                Address: {this.state.recieverAddress}
              </Text>
            </Card>
          </Card>

          <View style={styles.buttonContainer}>
            {this.state.recieverId !== this.state.userId ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.updateBookStatus();
                  this.addNotification();
                  this.props.navigation.navigate('MyDonations')
                }}>
                <Text>I want to Donate</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
});
