import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';

type Props = {};
export default class ModalNewNote extends Component<Props> {

    state = {
        modalVisible: true,
        title: "",
        description: "",
        date_create: "",
        date_update: "",
    }

    _onPost() {
        // console.log('titre = ', this.state.title)
        // console.log('description = ', this.state.description)
        // var dateNow = new Date().toString()
        // this.setState({
        //     date_create: dateNow
        // })
        // console.log('dateNow = ', dateNow)
        // console.log('date_creation = ', this.state.date_creation)
        // console.log('date_update = ', this.state.date_update)
        var IPAddr = '10.1.171.68'
        var mainRoot = 'http://' + IPAddr + ':3000'
        var routeAddNote = mainRoot + '/notes'

        fetch(routeAddNote, {
            // fetch('http://192.168.33.15:3000/login', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                date_create: this.state.date_create,
                date_update: this.state.date_update,
            }),
        })
            .then((response) => {
                console.log('datas envoyé')
                return response.json();
            })
            .then((datas) => {
                console.log('reponse serveur  : ' + datas)
                this.props.setParentState({ showModalNote: false });
            })
    }
    setModalVisible(visible) {
        this.props.setParentState({ showModalNote: false });
        this.setState({ modalVisible: visible });
        
    }
    _closeModal() {
        this.props.setParentState({ showModalNote: false });
        
    }
    render() {
        return (
            <View style={styles.container}>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>

                    <View style={styles.modalView}>
                        <Text>Titre : </Text>
                        <TextInput style={styles.inputTitle}
                            value={this.state.title}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => {
                                this.setState({
                                    title: text,
                                    date_create: new Date().toString(),
                                    date_update: new Date().toString()
                                })
                            }} />
                        <Text>Contenu : </Text>
                        <TextInput style={styles.inputContent}
                            value={this.state.description}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => {
                                this.setState({
                                    description: text,
                                    date_create: new Date().toString(),
                                    date_update: new Date().toString()
                                })
                            }} />
                    </View>

                    <View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity onPress={this._onPost.bind(this)} style={styles.button1}>
                                <Text>Ajouter la note</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                this.props.setParentState({ showModalNote: false });
                            }}
                                style={styles.buttonRed2}>
                                <Text>Retour</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    modalView: {
        flexDirection: 'column',
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

    buttonView: {
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button1: {
        backgroundColor: '#1e90ff',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    buttonRed2: {
        backgroundColor: '#DC143C',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
});