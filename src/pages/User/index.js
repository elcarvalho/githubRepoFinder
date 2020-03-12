import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

const User = ({route}) => {
  const [stars, setStars] = useState([]);
  const [user, setUser] = useState({
    name: '',
    login: '',
    bio: '',
    avatar: '',
  });

  useEffect(() => {
    const getGithubUser = async () => {
      const response = await api.get(
        `/users/${route.params.user.login}/starred`
      );

      setStars(response.data);
      setUser(route.params.user);
    };

    getGithubUser();
  }, []);

  return (
    <Container>
      <Header>
        <Avatar source={{uri: user.avatar}} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      <Stars
        data={stars}
        keyExtractor={star => String(star.id)}
        renderItem={({item}) => (
          <Starred>
            <OwnerAvatar source={{uri: item.owner.avatar_url}} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
      />
    </Container>
  );
};

User.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string,
        login: PropTypes.string,
        bio: PropTypes.string,
        avatar: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default User;
