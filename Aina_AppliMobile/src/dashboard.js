import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, FlatList, Text, StyleSheet, View } from 'react-native';
import ModalNewNote from './modalNewNote';
type Props = {};
export default class Dashboard extends Component<Props> {


    state = {
        notes: [],
        showModalNote: false
    }
    componentWillMount() {
        this.GetAllNotes()
    }
    GetAllNotes() {
        var IPAddr = '10.1.171.68'
        var mainRoot = 'http://' + IPAddr + ':3000'
        var routeAllNotes = mainRoot + '/notes'
        fetch(routeAllNotes, { 
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    notes: responseJson
                })
            }).catch(function (error) { // Pour le warning d'erreur "unhandled promise rejection"
                console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            });
    }
    notesTouch(lanote) {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerStyle}>
                    
                    <Text style={styles.menuItemStyle}>Modal Ici</Text>
                </View>
                <Text>Toutes les notes</Text>
                <FlatList
                    data={this.state.notes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (

                        <TouchableOpacity
                        style={styles.listStyle}
                        onPress={() => this.notesTouch(item)}>
                            <View >
                                <View style={{ flexDirection: 'column', flexShrink: 1 }}>
                                    <Text>{item.title}</Text>
                                    <Text style={{ flex: 1, flexWrap: 'wrap' }}>{item.description}</Text>
                                    <Text>Date de creation : {item.date_create}</Text>
                                    <Text>Date de modification : {item.date_update}</Text>
                                   
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}>
                </FlatList>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        
        flexDirection: 'column'
    },
    listStyle: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        margin: 1,
    },
    headerStyle: {
        flexDirection:'row',
        
        alignItems:'center',
        justifyContent:'flex-end',
        height:50
    },

    menuItemStyle: {
        marginLeft:'auto',
        backgroundColor:'red'
    }
});