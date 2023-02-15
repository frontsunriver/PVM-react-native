/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import { Container, HeaderButton } from '../../Components';
import useAppTheme from '../../Themes/Context';
import { IconX, ICON_TYPE } from '../../Icons';
import metrics from '../../Themes/Metrics';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Fonts from '../../Themes/Fonts';
import NavigationService from '../../Navigation';
import { useNavigation } from '@react-navigation/native'
import {STATUS, APP_STATE} from '../../Constants';

import {
  Button,
  FAB,
  Dialog,
  Portal,
  Provider as PaperProvider,
  TextInput,
  ActivityIndicator,
  Colors,
} from "react-native-paper";

import * as firebase from "firebase";
import { convertEpochToDateMonthYear } from "../../Config/helpers";
import Routes from '../../Navigation/Routes';

const MainScreen = (props) => {
  const { theme } = useAppTheme();
  // eslint-disable-next-line prettier/prettier
  const { username, password } = useStoreState(state => ({
    username: state.login.username,
    password: state.login.password,
  }));
  const setState = useStoreActions(actions => actions.login.changeAppState);

  const [device_model_name, setDeviceModelName] = useState(null);
  const [user_update, setUserUpdate] = useState(null);
  const [imageURI, setImageURI] = useState(null);
  const [showCreateGroupDialog, setShowCreateGroupDialog] = useState(false);
  const [showCreateGroupDialogLoader, setShowCreateGroupDialogLoader] = useState(false);
  const [groupName, setGroupName] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading_dialog_text, setLoadingDialogText] = useState("");
  const [uid, setUid] = useState(null);
  const [email, setEmail] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user == null) {
        // this.props.navigation.reset({
        //   index: 0,
        //   routes: [{ name: "Login" }],
        // });
      } else {
        let userId = firebase.auth().currentUser.uid;
        let email = firebase.auth().currentUser.email;
        setUid(userId);
        setEmail(email);
        _getDataFromDB(userId);
        getAllGroupData(userId);
      }
    });
  }, [])

  useEffect(() => {
    const _toggleDrawer = () => {
      NavigationService.toggleDrawer();
    };

    console.log('use effect home');

    navigation.setOptions({
      headerLeft: () => {
        return (
          <View style={{ marginLeft: 10 }}>
            <HeaderButton
              icon="menuunfold"
              color={theme.colors.headerTitle}
              iconOrigin={ICON_TYPE.ANT_ICON}
              onPress={_toggleDrawer}
            />
          </View>
        );
      },
    });
  }, [navigation, theme.colors.headerTitle]);

  useEffect(() => {
    // showGroupRender()
  }, [groupData])

  const _getDataFromDB = (uid) => {
    firebase
      .database()
      .ref("users/" + uid)
      .once("value")
      .then((data) => {
        const data1 = data.val();

        setDeviceModelName(data1.device.device_model_name);
        setImageURI(data1.profile_url);
      })
      .catch((error) => {
        // alert(error.message);
      });
  };

  const _updateProfileURL = (downloadURL, uid) => {
    setLoadingDialogText("Updating database...");
    firebase
      .database()
      .ref("users/" + uid)
      .update({
        profile_url: downloadURL,
      })
      .then(() => {
        setLoading(false);
        console.log("Finished updating database...");
      })
      .catch((error) => {
        // alert(error.message);
        setLoading(false);
      });
  };

  const uploadImageToDB = async (fileURI) => {
    setImageURI(fileURI);

    // Create Reference
    var storageRef = firebase.storage().ref();

    // Define path and image name
    var imageRef = storageRef.child("profiles/" + uid);

    // Fetch the image
    let response = await fetch(fileURI);
    let blob = await response.blob();

    setLoading(true);
    setLoadingDialogText("Uploading Profile Picture...");

    // Upload Image
    imageRef
      .put(blob)
      .then(() => {
        console.log("Uploaded...");
        setLoading(false);
        imageRef.getDownloadURL().then((url) => {
          _updateProfileURL(url, uid);
        });
      })
      .catch((error) => {
        // alert(error.message);
        setLoading(false);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.4,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      uploadImageToDB(result.uri);
    }
  };

  const showGroupRender = () => {
    return (
    groupData == null || groupData == "" ?  (
      <Text>You don't have any groups!</Text>
    ) : (
      <FlatList
        style={{ paddingTop: 10, paddingBottom: 10 }}
        data={groupData}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={item}
            onPress={() => {
              navigation.navigate(Routes.PROFILE_SCREEN, {
                groupName: item.group_name,
                group_id: item.group_id,
                createdAt: convertEpochToDateMonthYear(item.created_at),
              });
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 16,
              backgroundColor: Colors.white,
              paddingHorizontal: 20,
              paddingVertical: 12,
              width: 380,
              borderWidth: 1,
              borderColor: Colors.blueGrey500,
              borderRadius: 14,
            }}
          >
            <Image
              style={styles.groupImage}
              source={
                item.group_image == null
                  ? require("../../Assets/image/team.png")
                  : { uri: item.group_image }
              }
            />
            <View>
              <Text style={styles.groupTitle}>{item.group_name}</Text>
              <Text style={styles.groupSubTitle}>
                {convertEpochToDateMonthYear(item.created_at)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.group_id}
      />
    )
    )
  }

  const createGroup = (groupName, uid) => {
    // console.log(groupName);
    setLoading(true);

    const dateNow = Date.now();

    // Get a reference to the Group Unique ID
    let groupRef = firebase.database().ref("groups/").push();

    let groupKey = groupRef.key;
    // console.log(groupKey);

    let updateUserData = {};
    updateUserData["users/" + uid + "/groups/" + groupKey] = {
      group_id: groupKey,
      group_name: groupName,
      created_at: dateNow,
    };
    updateUserData["groups/" + groupKey] = {
      group_name: groupName,
      adminId: uid,
      created_at: dateNow,
      members: {
        [uid]: uid,
      },
    };

    // Save the data in firebase
    firebase
      .database()
      .ref()
      .update(updateUserData)
      .then(() => {
        getAllGroupData(uid);
        // Successfully executed
        // Hide the dialog box
        // Hide the show loader
        setGroupName(null);
        setShowCreateGroupDialog(false);
        setShowLoader(false);
      })
      .catch((error) => {
        // alert(error.message);
      });

    // Get the group data
  };

  const getAllGroupData = (uid) => {
    setLoading(true);
    setLoadingDialogText("Getting group data...");    
    // Get all group data
    firebase
      .database()
      // .ref("users/" + uid + "/groups/")
      .ref("groups/")
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        console.log("group data---------------------", data);
        let dataArray = new Array();
        for (const key in data) {
          var item = data[key];
          item.group_id = key;
          dataArray.push(item);
          // const element = object[key];
          // console.log(data[key]["group_name"]); // key["group_name"]
        }
        setGroupData(dataArray);
        setLoading(false);
      }).catch((error) => {
        setGroupData(null);
        setLoading(false);
      });
  };

  return (
    <LoadingActionContainer fixed>
      <Container
        style={{
          padding: 10,
        }}>
        {/* <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../../hero/3.png')}
            style={{
              width: metrics.screenWidth,
              aspectRatio: 1,
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text style={{fontSize: 20, textAlign: 'center', padding: 20}}>
          Home screen
        </Text>
        <View style={{padding: 20, margin: 10, backgroundColor: 'white'}}>
          <Text style={{textAlign: 'center', fontSize: 18}}>Welcome</Text>
          <Text style={{textAlign: 'center', fontFamily: Fonts.type.italic}}>
            {username + ' ' + password}
          </Text>
        </View> */}

        <PaperProvider>
          
        </PaperProvider>
      </Container>
    </LoadingActionContainer>
  );
};

const styles = StyleSheet.create({
  // loaderView: {
  //   height: "100%",
  //   width: "100%",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   position: "absolute",
  //   zIndex: 20,
  //   backgroundColor: "rgba(0, 0, 0, 0.4)",
  // },
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  textInput: {
    width: 200,
    borderColor: "#000",
    borderWidth: 2,
    margin: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    marginTop: 20,
  },
  uploadImageButton: {
    marginRight: 12,
  },
  email: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 20,
    backgroundColor: "#ba0089",
  },
  fabLeft: {
    position: "absolute",
    left: 0,
    bottom: 0,
    margin: 20,
    backgroundColor: "#ba0089",
  },

  groupTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  groupSubTitle: {
    fontSize: 16,
    color: Colors.blueGrey600,
  },
  groupImage: {
    width: 60,
    height: 60,
    marginRight: 20,
    borderRadius: 30,
    backgroundColor: Colors.grey50,
  },
});


export default MainScreen;
