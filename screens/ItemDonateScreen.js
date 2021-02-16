import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class ItemDonateScreen extends Component {
    constructor() {
        super()
        this.state = {
            requestedItemsList: []
        }
        this.requestRef = null
    }

    getRequestedItemsList = () => {
        this.requestRef = db.collection("requested_items")
            .onSnapshot((snapshot) => {
                var requestedItemsList = snapshot.docs.map(document => document.data());
                this.setState({
                    requestedItemsList: requestedItemsList
                });
                console.log(requestedItemsList);
            })
    }

    componentDidMount() {
        this.getRequestedItemsList()
    }

    componentWillUnmount() {
        this.requestRef();
    }

    keyExtractor = (item, index) => {
        index.toString()
    }

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                title={item.book_name}
                subtitle={item.reason_to_request}
                rightElement={
                    <TouchableOpacity>
                        <Text>View Request</Text>
                    </TouchableOpacity>
                }
            />
        )
    }



    render() {
        return (
            <SafeAreaProvider>
                <MyHeader title="Donate Item" />
                <FlatList
                    data={this.state.requestedBooksList}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor} />
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        }
    }
})