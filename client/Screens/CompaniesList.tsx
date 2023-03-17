import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';

const Divider = () => {
  return <View style={styles.divider} />;
};
const FancyList = () => {
  const [searchText, setSearchText] = useState('');
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getAllCompanies();
  }, []);
  useEffect(()=>{
    console.log(searchText);
  },[searchText]);
  const getAllCompanies = async () => {
    setCompanies([]);
    await axios('http://192.168.9.25:3000/users')
      .then(res => {
        if (res.data) {
          res.data.users.map((element: any) =>
            setCompanies(prevState => [...prevState, element]),
          );
        }
      })
      .catch(err => console.log(err.message));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search companies..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <View style={styles.container}>
        <ScrollView>
          {companies?.map((company, index) => (
            <View>
              <View style={styles.itemContainer} key={index}>
                <View style={styles.itemIcon} />
                <View>
                  <Text style={styles.itemTextName}>{company.STE}</Text>
                  <Text>{company.NUM}</Text>
                </View>
              </View>
              <Divider />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  itemIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#008080',
    marginRight: 10,
    marginTop: 5,
  },
  itemTextName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default FancyList;
