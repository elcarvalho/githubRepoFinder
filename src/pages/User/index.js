import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import api from '../../services/api';
import PropTypes from 'prop-types';

// import { Container } from './styles';

const User = ({route}) => {
  const [starred, setStarred] = useState([]);

  useEffect(() => {
    const getGithubUser = async () => {
      const {user} = route.params;
      const response = await api.get(`/users/${user.login}/starred`);

      setStarred(response.data);
      console.tron.log(response.data);
    };

    getGithubUser();
  }, []);
  return (
    <View>
      <Text>User</Text>
    </View>
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
