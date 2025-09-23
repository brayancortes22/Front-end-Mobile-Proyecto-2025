import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MobileSummarySection = () => {
  // Aquí puedes adaptar los datos si lo necesitas
  return (
    <View style={styles.fondo}>
      <View style={styles.distribucionParent}>
        <Text style={styles.titulo}>Distribución por Roles</Text>
        <Text style={styles.subtitulo}>Usuarios asignados por rol</Text>
        {/* Aquí irían los grupos, puedes mapear los datos si lo deseas */}
        <View style={styles.groups}>
          <View style={styles.rolInfo}><Text style={styles.rol}>Usuarios</Text><Text style={styles.rolDesc}>Usuarios del sistema</Text></View>
          <View style={[styles.contador, styles.bgUsuarios]}><Text style={[styles.contadorText, styles.textUsuarios]}>22 usuarios</Text></View>
        </View>
        <View style={styles.groups}>
          <View style={styles.rolInfo}><Text style={styles.rol}>Administradores</Text><Text style={styles.rolDesc}>Acceso completo al sistema</Text></View>
          <View style={[styles.contador, styles.bgAdministradores]}><Text style={[styles.contadorText, styles.textAdministradores]}>3 Administradores</Text></View>
        </View>
        <View style={styles.groups}>
          <View style={styles.rolInfo}><Text style={styles.rol}>Aprendices</Text><Text style={styles.rolDesc}>Aprendices del sistema</Text></View>
          <View style={[styles.contador, styles.bgAprendices]}><Text style={styles.contadorText}>3321 Aprendices</Text></View>
        </View>
        <View style={styles.groups}>
          <View style={styles.rolInfo}><Text style={styles.rol}>Instructores</Text><Text style={styles.rolDesc}>Instructores del sistema</Text></View>
          <View style={[styles.contador, styles.bgInstructores]}><Text style={styles.contadorText}>33 Instructores</Text></View>
        </View>
        <View style={styles.groups}>
          <View style={styles.rolInfo}><Text style={styles.rol}>Coordinadores</Text><Text style={styles.rolDesc}>Coordinadores del sistema</Text></View>
          <View style={[styles.contador, styles.bgCoordinadores]}><Text style={styles.contadorText}>1 Coordinador</Text></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fondo: {
    padding: 5,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  distribucionParent: {
    alignSelf: "stretch",
    gap: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontFamily: "Roboto-Bold",
    fontWeight: "600",
    lineHeight: 24,
    color: "#000",
    textAlign: "left",
  },
  subtitulo: {
    fontSize: 18,
    fontFamily: "Roboto-Regular",
    lineHeight: 24,
    color: "#000",
    textAlign: "left",
  },
  groups: {
    borderColor: "#000",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rolInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  rol: {
    color: "#525363",
    fontSize: 15,
    fontFamily: "Inter-Regular",
    marginBottom: 2,
  },
  rolDesc: {
    fontSize: 13,
    color: "#949cb2",
    fontFamily: "Inter-Regular",
  },
  contador: {
    borderRadius: 10,
    padding: 10,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  contadorText: {
    fontSize: 15,
    fontFamily: "Inter-Bold",
    textAlign: "center",
  },
  bgUsuarios: { backgroundColor: "#f5cdcd" },
  textUsuarios: { color: "#dc2626" },
  bgAdministradores: { backgroundColor: "#e0f5cd" },
  textAdministradores: { color: "#16a34a" },
  bgAprendices: { backgroundColor: "#cddef5" },
  bgInstructores: { backgroundColor: "#f5edcd" },
  bgCoordinadores: { backgroundColor: "#f0cdf5" },
});

export default MobileSummarySection;
