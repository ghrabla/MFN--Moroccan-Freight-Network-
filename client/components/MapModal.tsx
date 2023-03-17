import React, {useState} from 'react';
import {Modal, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import MapboxGL from '@rnmapbox/maps';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWVkb3gtcyIsImEiOiJjbGV5NGo3Z2cwOWQxM3lvNTRwOXh0N2NlIn0.0LJp5QXaKFxIhb4gMqmXag',
);
interface Marker{
  id:string,
  coordinate:number[]
}
const MyModal = (props: any) => {
  const {Coords,updateCoords} = props;
  const [coords, setCoords] = useState(Coords);
  const [marker, setMarker] = useState<Marker|null>(null);

  const initialCamera = {
    centerCoordinate: [-9.2353665, 32.2935008],
    zoomLevel: 4,
  };

  const handleMapLongPress = (event: any) => {
    const eventcoords = event.geometry.coordinates;
    setCoords(prevState => ({
      ...prevState,
      lang: eventcoords[0],
      lat: eventcoords[1],
    }));
    updateCoords(coords);
    const newMarker = {
      id: '1',
      coordinate: [
        coords.lang,
        coords.lat,
      ],
    };
    setMarker(newMarker);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        // Handle modal closing here
      }}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Company place</Text>
        <MapboxGL.MapView style={styles.map} onLongPress={handleMapLongPress}>
          <MapboxGL.Camera {...initialCamera} />
          {marker && (
            <MapboxGL.PointAnnotation
              id={marker.id}
              coordinate={marker.coordinate}
            />
          )}
        </MapboxGL.MapView>
        <TouchableOpacity style={styles.close}>
          <Text style={styles.CloseText} onPress={props.Close}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MyModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    display: 'flex',
    alignSelf: 'flex-end',
    height: '85%',
    width: '100%',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
  },
  close: {
    alignSelf: 'center',
    width: '30%',
    padding: 10,
  },
  CloseText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
  },
});
