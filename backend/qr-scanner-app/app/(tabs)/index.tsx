import { Text, View, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';

export default function Index() {

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState<any>(null);

  // 📷 HANDLE SCAN
  const handleScan = ({ data }: { data: string }) => {
    setScanned(true);

    console.log("SCANNED DATA:", data); // ✅ Debug

    fetch(`http://192.168.1.33:5000/api/qr/verify/${encodeURIComponent(data)}`)
      .then(res => res.json())
      .then(res => {
        console.log("FULL RESPONSE:", res); // ✅ Debug
        setResult(res);
      })
      .catch((err) => {
        console.log("ERROR:", err);
        setResult({ status: "error" });
      });
  };

  // 🔐 PERMISSION
  if (!permission) {
    return <Text style={styles.center}>Loading...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>No camera permission</Text>
        <Text onPress={requestPermission} style={{ color: "blue" }}>
          Tap to Allow Camera
        </Text>
      </View>
    );
  }

  // 🎯 RESULT SCREEN
  if (result) {

    const isValid =
      result?.status === "approved" ||
      result?.msg?.toLowerCase().includes("valid") ||
      result?.msg?.toLowerCase().includes("pass valid");

    return (
      <View style={[
        styles.resultContainer,
        { backgroundColor: isValid ? "#0f9d58" : "#d93025" }
      ]}>
        
        <Text style={styles.icon}>
          {isValid ? "✔️" : "❌"}
        </Text>

        <Text style={styles.title}>
          {isValid ? "VALID PASS" : "INVALID PASS"}
        </Text>

        {isValid && (
          <>
            <Text style={styles.text}>Route: {result?.route}</Text>
            <Text style={styles.text}>User: {result?.user}</Text>
          </>
        )}

        <Text
          style={styles.scanAgain}
          onPress={() => {
            setScanned(false);
            setResult(null);
          }}
        >
          🔄 Scan Again
        </Text>

      </View>
    );
  }

  // 📷 CAMERA SCREEN
  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleScan}
      />

      <View style={styles.overlay}>
        <Text style={styles.text}>📷 Scan QR Code</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  overlay: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 18
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    fontSize: 80,
    marginBottom: 20
  },
  title: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold"
  },
  scanAgain: {
    marginTop: 30,
    fontSize: 18,
    color: "yellow"
  }
});