import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import Db from '../config';
import firebase from 'firebase';

export default class SignupLoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
      confirmPassword: '',
      isModalVisible: false
    };
  }

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>
                Registration
              </Text>
              <TextInput
                style={styles.formTextInput}
                placeholder="first name"
                maxLength={15}
                onChangeText={(text) => {
                  this.setState({ firstName: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="last name"
                maxLength={15}
                onChangeText={(text) => {
                  this.setState({ lastName: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="address"
                multiline={true}
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="contact"
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({ contact: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="username"
                onChangeText={(text) => {
                  this.setState({ username: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="confirm password"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
              />
              <View>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => { this.userSignUp(this.state.username, this.state.password, this.state.confirmPassword) }}>
                  <Text style={styles.registerButtonText}>
                    Register
                    </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.cancelButton} onPress={() => {
                  this.setState({ isModalVisible: false })
                }}>
                  <Text style={{ color: '#ff5722' }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  userSignUp = (username, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return alert('Password does not match \n Check your password');
    } else
      firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then(() => {
          Db.collection("users").add({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            contact: this.state.contact,
            address: this.state.address,
            username: this.state.username,
          })
          return alert('User added successfully', '', [{
            text: 'ok', onPress: () => {
              this.setState({
                isModalVisible: false
              })
            }
          }])
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage);
        });
  }




  userLogin = (username, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        alert('User Logged In Successfully');
        this.props.navigation.navigate('DonateItems');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/barter.png')} style={{ width: 300, height: 200 }} />
        </View>
        {this.showModal()}
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.title}>Barter App</Text>
        </View>
        <View>
          <TextInput
            style={styles.loginBox}
            placeholder="username"
            onChangeText={(text) => {
              this.setState({ username: text });
            }}
          />
          <TextInput
            style={styles.loginBox}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
            onPress={() => {
              this.userLogin(this.state.username, this.state.password);
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({ isModalVisible: true })
            }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8BE85',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 65,
    fontWeight: '300',
    paddingBottom: 30,
    color: '#ff3d00'
  },
  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: '#ff8a65',
    fontSize: 20,
    margin: 10,
    paddingLeft: 10
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: '#ff5722',
    margin: 50
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffff",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30
  },
  registerButtonText: {
    color: '#ff5722',
    fontSize: 15,
    fontWeight: 'bold'
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  button: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: "#ff9800",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10
  },
  buttonText: {
    color: '#ffff',
    fontWeight: '200',
    fontSize: 20
  }
});