import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Switch } from 'react-native';
import MapView, { Marker, Callout, CalloutSubview } from 'react-native-maps';
import * as Location from 'expo-location';
import MapButton from '../components/MapButton';
import safe from "../../assets/safe.png"
import filter from "../../assets/filter.png"
import warning from "../../assets/warning.png"
import waterwell from "../../assets/waterwell.png"
import medicalStation from "../../assets/medicalStation.png"
import {Context as DataContext} from '../context/DataContext'

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterSettings, setFilterSettings] = useState({
    waterwell: true,
    disaster: true,
    medicalStation: true,
    safe: true
  });
  const {state, addEntry, fetchEntries, removeEntry} = useContext(DataContext)

  useEffect(() => {
    let locationSubscription;
    const startTrackingLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission denied');
        return;
      }
      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Update every 5 seconds
          distanceInterval: 5, // Update if user moves 5 meters
        },
        (newLocation) => {
          setLocation(newLocation.coords); // Update the location state
        }
      );
    };

    startTrackingLocation();

    return () => {
      // Cleanup subscription when component unmounts
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEntries()
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (x) => x * Math.PI / 180;
    const R = 6371000; 
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 

    return distance;
  };

  const toggleMarker = (type) => {
    const isDuplicate = state.entries.some(entry =>
      haversineDistance(entry.latitude, entry.longitude, location.latitude, location.longitude) <= 10
    );
    if (isDuplicate) {
        return; 
    }
    addEntry({type: type, latitude: location.latitude, longitude: location.longitude})
  };

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!location) {
    return <Text>Loading...</Text>;
  }

  const getIcon = (type) =>  activateMarker[type]; 

  const activateMarker = {
    waterwell: require('../../assets/waterwell.png'),
    disaster: require('../../assets/warning.png'),
    medicalStation: require('../../assets/medicalStation.png'),
    safe: require('../../assets/safe.png'),
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01, 
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={"Your Location"}
          description={"This is your current location"}
        />
        {state.entries.map(({ id, latitude, longitude, type, creator, creatorID, date }) =>
          latitude &&
          longitude &&
          filterSettings[type] && (
            <Marker
              key={id}
              coordinate={{ latitude, longitude }}
              title={type}
              image={getIcon(type)}
            >
              <Callout>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                  {state.user._id === creatorID ? (
                    <CalloutSubview
                      style={{
                        width: '100%',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        removeEntry({ id });
                      }}
                    >
                      <Text style={{ color: 'red' }}>REMOVE</Text>
                    </CalloutSubview>
                  ) : (
                    <View></View>
                  )}
                  <View style={{ paddingTop: 20, alignItems: 'center' }}>
                    <Text>This is a {type} zone.</Text>
                    <Text>Marked by {creator} on {date}.</Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          )
        )}
      </MapView>

      <View style={{ position: 'absolute', top: 50, right: 10 }}>
        <MapButton
          title="FILTER"
          icon={filter}
          onPress={() => setFilterVisible(!filterVisible)}
        />

        {filterVisible && (
          <View style={styles.dropdown}>
            {Object.keys(filterSettings).map((type) => (
              <View key={type} style={styles.dropdownItem}>
                <Text style={styles.dropdownLabel}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
                <Switch
                  value={filterSettings[type]}
                  onValueChange={() =>
                    setFilterSettings((prevSettings) => ({
                      ...prevSettings,
                      [type]: !prevSettings[type],
                    }))
                  }
                  thumbColor={filterSettings[type] ? "#a6d841" : "#aa1111" }
                  trackColor={{ false: "#767577", true: "#5174aa" }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <MapButton title="ADD WATERWELL" icon={waterwell} onPress={() => toggleMarker('waterwell')} />
        <MapButton title="MARK DISASTER ZONE" icon={warning} onPress={() => toggleMarker('disaster')} />
        <MapButton title="ADD MEDICAL STATION" icon={medicalStation} onPress={() => toggleMarker('medicalStation')} />
        <MapButton title="MARK AS SAFE" icon={safe} onPress={() => toggleMarker('safe')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  callout: {
    width: 150,
    padding: 10,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    position: 'absolute',
    top: 80, 
    width: 180, 
    right: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6, 
  },
  dropdownLabel: {
    fontSize: 12, 
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10, 
    right: 10,
    gap: 8, 
  },
  button: {
    width: 110,
    height: 40, 
  },
});

export default MapScreen;