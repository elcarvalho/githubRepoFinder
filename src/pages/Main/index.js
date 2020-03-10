import React, {useState} from 'react';
import {Keyboard} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import {Container, Form, Input, SubmitButton} from './styles';

export default function Main() {
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState([]);

  const handleAddUser = async () => {
    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    const newUsers = [...users, data];

    setUsers(newUsers);
    setNewUser('');

    Keyboard.dismiss();
    console.tron.log(users);
  };

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={newUser}
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />

        <SubmitButton onPress={handleAddUser}>
          <Icon name="add" size={20} color="#FFF" />
        </SubmitButton>
      </Form>
    </Container>
  );
}
