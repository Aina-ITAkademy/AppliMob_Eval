import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';

type Props = {};
export default class ModalNewNote extends Component<Props> {

    state = {
        modalVisible: false,
        title: "",
        description: "",
        date_creation: "",
        date_update: "",
    }

    render() {
        return (
            <View style={{ marginLeft: 'auto', marginTop: 30, paddingRight: 10 }}>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>

                    <View style={{ marginTop: 22 }}>
                        <View style={styles.modalUser}>
                            <Text>Mon compte</Text>
                            <TouchableOpacity>
                                <Text style={{ marginTop: 10, color: '#33B8FF' }}
                                    onPress={this._onLogout.bind(this)}>
                                    Me déconnecter</Text>
                            </TouchableOpacity>

                            <View style={styles.container}>

                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput style={styles.input}
                                        value={this.state.name}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={(text) => { this.setState({ name: text }) }} />
                                </View>

                                <View style={{ margin: 5, flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={this._onUpdate.bind(this)} style={styles.button}>
                                        <Text>Ajouter la note</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={this._onDelete.bind(this)} style={styles.buttonRed}>
                                        <Text>Retour</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={{ fontSize: 30 }}>&#10006;</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>

                <TouchableOpacity
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text style={{ fontSize: 30 }}>&#128100;</Text>
                </TouchableOpacity>

            </View>

        );
    }
}