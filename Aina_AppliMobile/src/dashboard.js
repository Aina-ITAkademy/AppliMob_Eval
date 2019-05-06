import React, { Component } from 'react';
import { TouchableOpacity, TextInput, ScrollView, FlatList, Text, StyleSheet, View } from 'react-native';
import ModalNewNote from './modalNewNote';
type Props = {};
export default class Dashboard extends Component<Props> {


    state = {
        notes: [],
        showModalNote: false,
        showNoteView: false,

        refresh: false,
        current_note: '',
        Update_title: "",
        Update_description: "",
        Update_date_update: "",
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
        console.log(lanote)
        this.setState({
            showNoteView: true,
            current_note: lanote
        })
    }
    _onUpdate() {
        var IPAddr = '10.1.171.68'
        var idNote = this.state.current_note._id
        var route = 'http://' + IPAddr + ':3000/notes/' + idNote
        console.log("la route : " + route)
        fetch(route, {
            // fetch('http://http://192.168.33.15:3000/users', {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.Update_title,
                description: this.state.Update_description,
                date_update: this.state.Update_date_update,
            }),
        }).then(function (result) { console.log('result', result); return result.json({}) })
            .then(function (datas) {
                this.setState({ showNoteView: false })
            }
                .bind(this)
            );
    }

    _onDelete() {
        var IPAddr = '10.1.171.68'
        var idNote = this.state.current_note._id
        var route = 'http://' + IPAddr + ':3000/notes/' + idNote
        fetch(route, {
            //     // fetch('http://http://192.168.33.15:3000/users', {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.current_note._id
            }),
        }).then((response) => response.text())
            .then((datas) => {
                this.setState({ showNoteView: false })
            })
    }

render() {
    return (
        <View style={styles.container}>
            <View style={styles.headerStyle}>
                <TouchableOpacity
                    onPress={() => this.showModalAdd()}
                >
                    <Text style={styles.menuItemStyle}>
                        Ajouter une note
                        </Text>
                </TouchableOpacity>
            </View>


            {(this.state.showModalNote) ? (
                <ModalNewNote setParentState={this.setState.bind(this)} />
            ) : (
                    (this.state.showNoteView) ? (
                        <View style={{ flexDirection: 'column' }}>
                            <Text>Titre : </Text>
                            <TextInput
                                style={styles.inputTitle}
                                value={this.state.current_note.Update_title}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => {
                                    this.setState({
                                        Update_title: text,
                                        Update_date_update: new Date().toString()
                                    })
                                }} />
                            <Text>Contenu : </Text>
                            <TextInput
                                style={styles.inputContent}
                                value={this.state.current_note.Update_description}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => {
                                    this.setState({
                                        Update_description: text,
                                        Update_date_update: new Date().toString()
                                    })
                                }} />
                            <View style={styles.buttonView}>
                                <TouchableOpacity onPress={this._onUpdate.bind(this)} style={styles.button1}>
                                    <Text>Modifier la note</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this._onDelete.bind(this)} style={styles.buttonRed2}>
                                    <Text>Effacer la note</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ showNoteView: false })
                                }}
                                    style={styles.button3}>
                                    <Text>Retour</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
                                                    {new Date(item.date_update).getHours()}h{new Date(item.date_update).getMinutes()}_
                                                     le {new Date(item.date_update).getDate()}/{new Date(item.date_update).getMonth()}/{new Date(item.date_update).getFullYear()}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}>
                                </FlatList>
                            </View>
                        )
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
    buttonView: {
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    buttonRed2: {
        backgroundColor: '#DC143C',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    button3: {
        backgroundColor: 'green',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    noteView: {
        flexDirection: 'column',
        backgroundColor: 'red',
        flex: 1,
    },
    inputTitle: {
        height: 40,
        borderColor: 'silver',
        borderWidth: 1,
        margin: 10
    },
    inputContent: {
        height: 200,

        borderColor: 'silver',
        borderWidth: 1,
        margin: 10,
        padding: 0
    },
});