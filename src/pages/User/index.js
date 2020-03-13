import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

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
  OwnerButton,
} from './styles';

const User = ({route, navigation}) => {
  const [stars, setStars] = useState([]);
  const [user, setUser] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [endOfList, setEndOfList] = useState(false);

  const getStars = useCallback(async () => {
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
  }, []);

  const handleLoadMore = async () => {
    if (endOfList) return;

    const newPage = page + 1;
    setLoading(true);

    try {
      const response = await api.get(
        `/users/${route.params.user.login}/starred?page=${newPage}`
      );

      const starred = response.data;

      if (starred.length === 0) {
        setEndOfList(true);
      }

      setStars([...stars, ...starred]);
      setPage(newPage);
    } catch (error) {
      console.tron.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshList = () => {
    setPage(1);
    getStars();
  };

  const handleShowDetails = (repository, name) => {
    navigation.navigate('Details', {repository, name});
  };

  useEffect(() => {
    getStars();
  }, []);

  return (
    <Container>
      <Header>
        <Avatar source={user && {uri: user.avatar}} />
        <Name>{user && user.name}</Name>
        <Bio>{user && user.bio}</Bio>
      </Header>

      <Stars
        data={stars}
        keyExtractor={star => String(star.id)}
        onEndReachedThrehold={0.2}
        onEndReached={handleLoadMore}
        onRefresh={handleRefreshList}
        refreshing={loading}
        renderItem={({item}) => (
          <Starred>
            <OwnerAvatar source={{uri: item.owner.avatar_url}} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
            <OwnerButton
              onPress={() => handleShowDetails(item.owner, item.name)}>
              <Icon name="remove-red-eye" size={20} color="#fff" />
            </OwnerButton>
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default User;
