import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
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
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGithubUser = async () => {
      try {
        const response = await api.get(
          `/users/${route.params.user.login}/starred`
        );

        setStars(response.data);
        setUser(route.params.user);
      } catch (error) {
        console.tron.log(error);
      } finally {
        setLoading(false);
      }
    };

    getGithubUser();
  }, []);

  return (
    <Container>
      <Header>
        <Avatar source={user && {uri: user.avatar}} />
        <Name>{user && user.name}</Name>
        <Bio>{user && user.bio}</Bio>
      </Header>
      {loading ? (
        <ActivityIndicator size="large" color="#7159c1" />
      ) : (
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
      )}
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
