import { Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { useState, useEffect } from 'react';

export default function Index() {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    Camera.requestCameraPermissionsAsync().then((permission) => {
      setHasPermission(permission.status === 'granted');
    });
  }, []);

  const handleScan = (event) => {
    const data = event.data;

    setScanned(true);
    alert("Scanned: " + data);

    fetch(`http://192.168.1.45:5000/api/qr/verify/${encodeURIComponent(data)}`)
      .then(res => res.json())
      .then(res => alert(JSON.stringify(res)))
      .catch(err => alert("Error: " + err));
  };

  if (hasPermission === null) {
    return <Text>Requesting permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No camera access</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleScan}
        style={{ flex: 1 }}
      />

      {scanned && (
        <Text
          onPress={() => setScanned(false)}
          style={{ textAlign: 'center', padding: 20 }}
        >
          Tap to Scan Again
        </Text>
      )}
    </View>
  );
}