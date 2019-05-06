import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, FlatList, Text, StyleSheet, View } from 'react-native';
import ModalNewNote from './modalNewNote';
type Props = {};
export default class Dashboard extends Component<Props> {


    state = {
        notes: [],
        showModalNote: false,
        showNoteView: false,
        refresh: false
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
    showModalAdd() {
        this.setState({ showModalNote: true })
    }

    getHours(StringDate) {
        out = new Date(StringDate).getHours + new Date(StringDate).getMinutes
    }
    notesTouch(lanote) {
        
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerStyle}>
                    <TouchableOpacity
                        onPress={() => this.showModalAdd()}
                    >
                        <Text style={styles.menuItemStyle}>
                            Modal Ici
                        </Text>
                    </TouchableOpacity>
                </View>


                {(this.state.showModalNote) ? (
                    <ModalNewNote setParentState={this.setState.bind(this)} />
                ) : (
                        <View>
                            <TouchableOpacity onPress={this.GetAllNotes.bind(this)} style={styles.button1}>
                                <Text>Rafraichir la liste</Text>
                            </TouchableOpacity>
                            <FlatList
                                data={this.state.notes}
                                extraData={this.state.refresh}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (

                                    <TouchableOpacity
                                        style={styles.listStyle}
                                        onPress={() => this.notesTouch(item)}>
                                        <View >
                                            <View style={{ flexDirection: 'column', flexShrink: 1 }}>
                                                <Text>{item.title}</Text>
                                                <Text style={{ flex: 1, flexWrap: 'wrap' }}>{item.description}</Text>
                                                {/* <Text>Date de creation : 
                                            {new Date(item.date_create).getHours()}
                                            h
                                            {new Date(item.date_create).getMinutes()}
                                            </Text> */}
                                                <Text>Date de modification :
                                                    {new Date(item.date_update).getHours()}h{new Date(item.date_update).getMinutes()}
                                                     {/* le {new Date(item.date_update).getDate()}/{new Date(item.date_update).getMonth()}/{new Date(item.date_update).getFullYear()} */}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}>
                            </FlatList>
                        </View>
                    )}
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
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 50
    },

    menuItemStyle: {
        marginLeft: 'auto',
        backgroundColor: 'red'
    },    
    button1: {
        backgroundColor: '#1e90ff',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
});