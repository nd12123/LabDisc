// ignore_for_file: non_constant_identifier_names, constant_identifier_names, file_names

import 'dart:math';

import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';
import 'package:globilab/controllers/LandingController.dart';
import 'package:globilab/utils/Helpers.dart';
import 'package:flutter_translate/flutter_translate.dart';
import '../../models/SensorData.dart';
import 'strings/Strings.dart';

class Sensors {
  static const int NO_SENS = 0;
  static const int UV = 1;
  static const int PH = 2;
  static const int CO = 3;
  static const int BAROMETER = 4;
  static const int IR_TEMP = 5;
  static const int HUMIDITY = 6; // SHT11
  static const int GPS = 7;
  static const int GPS_LAT = 8;
  static const int GPS_LONG = 9;
  static const int GPS_SPEED = 10;
  static const int GPS_ANGLE = 11;
  // static const int AMB_TEMP_SHT = 12; // SHT11
  static const int EXTERNAL_TEMPERATURE = 13; // 15XH103FA
  static const int COLORIMETER = 14;
  static const int COLORIMETER_R = 15;
  static const int COLORIMETER_G = 16;
  static const int COLORIMETER_B = 17;
  // static const int AMB_TEMP_NTC = 18; // 0805E3103FMT -- for junior
  // static const int EXT_TEMP_NTC = 19; // B57861S0103F040
  static const int LIGHT = 20;
  static const int SOUND = 21;
  static const int PULSE = 22;
  static const int HEARTRATE = 23;
  static const int PULSE_WAVEFORM = 24;
  static const int DISTANCE = 25;
  static const int AIRPRESSURE = 26;
  static const int VOLTAGE = 27;
  static const int CURRENT = 28;
  static const int HUMIDITY_ANALOG = 29;
  static const int AMB_TEMPERATURE = 30;
  static const int TURBIDITY = 31;
  static const int EXTERNAL_A = 32; // need to read another byte to
  // decide which sensor
  static const int MICROPHONE = 33;

  static const int LOW_VOLTAGE = 34;
  static const int ACCELERATION = 35;
  static const int ACCELERATION_X = 36;
  static const int ACCELERATION_Y = 37;
  static const int ACCELERATION_Z = 38;
  static const int EXTERNAL_B = 39; // need to read another byte to
  // decide which sensor
  static const int DISSOLVED_OXYGEN = 40;
  static const int CONDUCTIVITY = 41;
  static const int THERMOCOUPLE = 42;

  // 43-46: reserved for iPad
  static const int BAROMETER_KPA = 47;
  static const int ION = 48;
  static const int MINI_VOLTAGE = 49;
  static const int MINI_CURRENT = 50;

  static const int ANDROID_FIRST = 90;
  static const int ANDROID_LIGHT = 90;
  static const int ANDROID_MIC_LEVEL = 92;
  static const int ANDROID_MIC_PITCH = 93;
  static const int ANDROID_ACCELERATION_X = 94;
  static const int ANDROID_ACCELERATION_Y = 95;
  static const int ANDROID_ACCELERATION_Z = 96;
  static const int ANDROID_LAST = 97;

  // 101-108 external sensors
  static const int EXT_CURRENT = 101;
  static const int EXT_RESPIRATION = 102;
  static const int EXT_VOLTAGE = 103;
  static const int EXT_MAGNETIC10 = 104;
  static const int EXT_MAGNETIC02 = 105;
  static const int EXT_HEARTRATE = 106;
  static const int EXT_TEMPERATURE = 107;
  static const int EXT_CO2 = 108;
  // static const int EXT_CURRENT12 = 109;
  static const int EXT_SOUND = 110;
  static const int EXT_PHOTOGATE = 112;
  static const int EXT_PHOTOGATE_HEART = 113;
  static const int EXT_HEARTRATE_RATE = 114;

  static const int SIM_DISTANCE = 200;
  static const int SIM_SPEED = 201;
  static const int SIM_ENERGY = 202;
  static const int SIM_ANGLE = 203;

  static const int FA_FORCE50 = 250;
  static const int FA_FORCE5 = 251;
  static const int FA_ACC_X = 252;
  static const int FA_ACC_Y = 253;
  static const int FA_ACC_Z = 254;

  static const double FA_FORCE50_LIMIT = 50;
  static const double FA_FORCE5_LIMIT = 5;

  static int FA_FORCE5_OFFSET = 0;
  static int FA_FORCE50_OFFSET = 0;

  static const int VERNIER_CODE = 299;
  static const int VERNIER_FIRST = 300;
  static const int VERNIER_3DACC = 300;
  static const int VERNIER_ANEMOMETER = 301;
  static const int VERNIER_BAROMETER = 302;
  static const int VERNIER_BLOOD_PRESSURE = 303;
  static const int VERNIER_CHARGE100 = 304;
  static const int VERNIER_CO2_10000 = 305;
  static const int VERNIER_CO2_100000 = 306;
  static const int VERNIER_COLORIMETER = 307;
  static const int VERNIER_CONDUCTIVITY200 = 308;
  static const int VERNIER_CONDUCTIVITY2000 = 309;
  static const int VERNIER_CONDUCTIVITY20000 = 310;
  static const int VERNIER_CURRENT = 311;
  static const int VERNIER_DISSOLVED_OXYGEN = 312;
  static const int VERNIER_EKG = 313;
  static const int VERNIER_ELECTRODE_AMPLIFIER = 314;
  static const int VERNIER_FLOW_RATE = 315;
  static const int VERNIER_FORCE10 = 316;
  static const int VERNIER_FORCE50 = 317;
  static const int VERNIER_GAS_PRESSURE = 318;
  static const int VERNIER_LIGHT600 = 319;
  static const int VERNIER_LIGHT6000 = 320;
  static const int VERNIER_LIGHT150000 = 321;
  static const int VERNIER_MAGNETIC_FIELD_03 = 322;
  static const int VERNIER_MAGNETIC_FIELD_64 = 323;
  static const int VERNIER_MICROPHONE = 324;
  static const int VERNIER_O2_GAS_SENSOR = 325;
  static const int VERNIER_ORP = 326;
  static const int VERNIER_PH = 327;
  static const int VERNIER_PHOTOGATE = 328;
  static const int VERNIER_RELATIVE_HUMIDITY = 329;
  static const int VERNIER_RESPIRATION = 330;
  static const int VERNIER_SALINITY = 331;
  static const int VERNIER_SPIROMETER = 332;
  static const int VERNIER_SOUND_LEVEL = 333;
  static const int VERNIER_SOIL_MOISTURE = 334;
  static const int VERNIER_UVA = 335;
  static const int VERNIER_UVB = 336;
  static const int VERNIER_VOLTAGE = 337;
  static const int VERNIER_LAST = 337;

  static SensorData getSensorData(int ID) {
    int bytes = 2;
    int precision = 2; //how many numbers after point
    int splitCount = 0;
    int offset = 0;
    bool invert = false;
    bool temperature = false;
    String name = "";
    String unit = "";
    double sensMin = 0,
        sensMax = 100,
        typical = 50,
        defaultValue = 0,
        minSoftware = 0,
        maxSoftware = 100; //default value;

    // int icon = ctx.getResources().getDrawable(1);
    // int // iconId = R.drawable.sensor_general_input;
    switch (ID) {
      case UV:
        name = Strings.data["sensor_name_uv"];
        unit = Strings.data["sensor_unit_uv"];
        sensMin = 0;
        sensMax = 14;
        minSoftware = 0;
        maxSoftware = 14;
        typical = 1.5;
        // // iconId = R.drawable.sensor_uv;
        break;
      case PH:
        name = Strings.data["sensor_name_ph"];
        unit = Strings.data["sensor_unit_ph"];
        sensMin = 0;
        sensMax = 14;
        minSoftware = 0;
        maxSoftware = 14;
        typical = 7;
        // // iconId = R.drawable.sensor_ph;
        break;
      case CO:
        name = Strings.data["sensor_name_co"];
        unit = Strings.data["sensor_unit_co"];
        sensMin = 0;
        sensMax = 30;
        minSoftware = 0;
        maxSoftware = 30;
        typical = 5;
        // // iconId = R.drawable.sensor_co;
        break;
      case BAROMETER:
        name = Strings.data["sensor_name_barometer"];
        if (LandingController.to.barometerIsmBar.value) {
          unit = Strings.data["sensor_unit_barometer_mBar"];
        } else {
          unit = Strings.data["sensor_unit_barometer_hpa"];
        }
        sensMin = 500;
        sensMax = 1150;
        minSoftware = 500;
        maxSoftware = 1150;
        typical = 1000;
        defaultValue = 500;
        precision = 1;
        // // iconId = R.drawable.sensor_air_pressure;
        break;
      case BAROMETER_KPA:
        name = Strings.data["sensor_name_barometer"];
        unit = Strings.data["sensor_unit_barometer_hpa"];
        sensMin = 50;
        sensMax = 115;
        minSoftware = 50;
        maxSoftware = 115;
        defaultValue = 50;
        typical = 100;
        // // iconId = R.drawable.sensor_air_pressure;
        break;
      case IR_TEMP:
        name = Strings.data["sensor_name_ir"];
        if (LandingController.to.temperatureUnitIsC.isTrue) {
          unit = Strings.data["sensor_temperature_unit_C"];
          sensMin = -170.0;
          sensMax = 380.0;
          minSoftware = -170.0;
          maxSoftware = 380.0;
        } else {
          unit = Strings.data["sensor_temperature_unit_F"];
          sensMin = -274.0;
          sensMax = 716.0;
          minSoftware = -274.0;
          maxSoftware = 716.0;
        }
        temperature = true;
        typical = 22.5;
        precision = 1;
        // // iconId = R.drawable.sensor_ir;
        break;
      case HUMIDITY:
        name = Strings.data["sensor_name_humidity"];
        unit = Strings.data["sensor_unit_humidity"];
        sensMin = 0;
        sensMax = 100;
        minSoftware = 0;
        maxSoftware = 100;
        typical = 50;
        precision = 1;
        // // iconId = R.drawable.sensor_rh;
        break;
      case GPS:
        name = Strings.data["sensor_name_gps"];
        splitCount = 5;
        bytes = 12;
        precision = 0;
        // // iconId = R.drawable.sensor_gps;
        break;
      case GPS_LAT:
        name = Strings.data["sensor_name_gps_latitude"];
        unit = Strings.data["sensor_unit_gps_longlat"];
        bytes = 4;
        sensMin = -90;
        sensMax = 90;
        minSoftware = -90;
        maxSoftware = 90;
        typical = 32;
        precision = 2;
        break;
      case GPS_LONG:
        name = Strings.data["sensor_name_gps_longitude"];
        unit = Strings.data["sensor_unit_gps_longlat"];
        bytes = 4;
        sensMin = -180;
        sensMax = 180;
        minSoftware = -180;
        maxSoftware = 180;
        typical = 34;
        precision = 2;
        break;
      case GPS_SPEED:
        name = Strings.data["sensor_name_gps_speed"];
        unit = Strings.data["sensor_unit_gps_speed"];
        sensMin = 0;
        sensMax = 600;
        minSoftware = 0;
        maxSoftware = 600;
        typical = 10;
        precision = 2;
        break;
      case GPS_ANGLE:
        name = Strings.data["sensor_name_gps_angle"];
        unit = Strings.data["sensor_unit_gps_angle"];
        sensMin = 0;
        sensMax = 360;
        minSoftware = 0;
        maxSoftware = 360;
        typical = 0;
        precision = 1;
        break;
      // case AMB_TEMP_SHT: // SHT11
      //   name = Strings.data["sensor_name_amb_temp"];
      //   unit = Strings.data["sensor_temperature_unit_C"];
      //   temperature = true;
      //   sensMin = -10;
      //   sensMax = 50;
      //   minSoftware = -10;
      //   maxSoftware = 50;
      //   typical = 23;
      //   precision = 1;
      //   // // iconId = R.drawable.sensor_tmp_int;
      //   break;
      case COLORIMETER:
        name = Strings.data["sensor_name_colorimeter"];
        splitCount = 3;
        bytes = 6;
        precision = 1;
        // // iconId = R.drawable.sensor_prisma;
        break;
      case COLORIMETER_R:
        name = Strings.data["sensor_name_colorimeter_red"];
        unit = Strings.data["sensor_unit_colorimeter"];
        sensMin = 0;
        sensMax = 100;
        minSoftware = 0;
        maxSoftware = 100;
        typical = 50;
        precision = 1;
        break;
      case COLORIMETER_G:
        name = Strings.data["sensor_name_colorimeter_green"];
        unit = Strings.data["sensor_unit_colorimeter"];
        sensMin = 0;
        sensMax = 100;
        minSoftware = 0;
        maxSoftware = 100;
        typical = 50;
        precision = 1;
        break;
      case COLORIMETER_B:
        name = Strings.data["sensor_name_colorimeter_blue"];
        unit = Strings.data["sensor_unit_colorimeter"];
        sensMin = 0;
        sensMax = 100;
        minSoftware = 0;
        maxSoftware = 100;
        typical = 50;
        precision = 1;
        break;
      // case AMB_TEMP_NTC: // NTCS0805E3103FMT -- for junior
      //   name = Strings.data["sensor_name_amb_temp"];
      //   unit = Strings.data["sensor_temperature_unit_C"];
      //   temperature = true;
      //   sensMin = -40;
      //   sensMax = 125;
      //   minSoftware = -40;
      //   maxSoftware = 125;
      //   typical = 23;
      //   precision = 1;
      //   // // iconId = R.drawable.sensor_tmp_int;
      //   break;
      // case EXT_TEMP_NTC: // B57861S0103F040
      //   name = Strings.data["sensor_name_ext_temp"];
      //   unit = Strings.data["sensor_temperature_unit_C"];
      //   temperature = true;
      //   sensMin = -20;
      //   sensMax = 125;
      //   minSoftware = -20;
      //   maxSoftware = 125;
      //   typical = 30;
      //   precision = 1;
      //   // // iconId = R.drawable.sensor_tmp_ext;
      //   break;
      case LIGHT:
        name = Strings.data["sensor_name_Light"];
        unit = Strings.data["sensor_unit_light"];
        sensMin = 0;
        sensMax = 55000;
        minSoftware = 0;
        maxSoftware = 55000;
        // sensMaxSoftware = 999;
        typical = 10000;
        precision = 0;
        // // iconId = R.drawable.sensor_light;
        break;
      case SOUND:
        name = Strings.data["sensor_name_sound"];
        unit = Strings.data["sensor_unit_sound"];
        sensMin = 30;
        sensMax = 110;
        minSoftware = 30;
        maxSoftware = 110;
        typical = 20;
        defaultValue = 30;
        precision = 1;
        // // iconId = R.drawable.sensor_mic;
        break;
      // case HEARTRATE:
      //   name = Strings.data["sensor_name_heart_rate"];
      //   unit = Strings.data["sensor_unit_heart_rate"];
      //   splitCount = 2;
      //   bytes = 4;
      //   sensMin = 0;
      //   sensMax = 150;
      //   // // iconId = R.drawable.sensor_ekg;
      //   break;
      case PULSE:
        name = Strings.data["pulse"];
        unit = Strings.data["sensor_unit_heart_rate"];
        sensMin = 40;
        bytes = 4;
        sensMax = 240;
        minSoftware = 40;
        maxSoftware = 240;
        splitCount = 2;
        typical = 80;
        defaultValue = 40;
        precision = 0;
        break;
      case HEARTRATE:
        name = Strings.data["sensor_name_heart_rate"];
        unit = Strings.data["sensor_unit_heart_rate"];
        sensMin = 40;
        sensMax = 240;
        minSoftware = 40;
        maxSoftware = 240;
        defaultValue = 40;
        typical = 80;
        precision = 0;
        break;
      case PULSE_WAVEFORM:
        name = Strings.data["pulse_waveform"];
        unit = Strings.data["sensor_unit_heart_pulse"];
        sensMin = 0;
        sensMax = 3.3;
        minSoftware = 0;
        maxSoftware = 3.3;
        typical = 1.5;
        precision = 1;
        // // iconId = R.drawable.sensor_ekg;
        break;
      case DISTANCE:
        name = Strings.data["sensor_name_distance"];
        unit = Strings.data["sensor_unit_distance"];
        sensMin = 0;
        sensMax = 10;
        minSoftware = 0;
        maxSoftware = 10;
        defaultValue = 0;
        precision = 3;
        // // iconId = R.drawable.sensor_distance;
        break;
      case AIRPRESSURE:
        name = Strings.data["sensor_name_air_pressure"];
        unit = Strings.data["sensor_unit_air_pressure"];
        sensMin = 0;
        sensMax = 300.0;
        minSoftware = 0;
        maxSoftware = 300.0;
        precision = 1;
        typical = 2;
        // // iconId = R.drawable.sensor_baromatic;
        break;
      case VOLTAGE:
      case MINI_VOLTAGE:
        name = Strings.data["sensor_name_voltage"];
        unit = Strings.data["sensor_unit_voltage"];
        sensMin = -30;
        sensMax = 30;
        minSoftware = -30;
        maxSoftware = 30;
        typical = 5;
        // // iconId = R.drawable.sensor_v;
        break;
      case CURRENT:
      case MINI_CURRENT:
        name = Strings.data["sensor_name_current"];
        unit = Strings.data["sensor_unit_current"];
        sensMin = -1;
        minSoftware = -1;
        if (ID == MINI_CURRENT) sensMin = 0;
        sensMax = 1;
        if (ID == MINI_CURRENT) minSoftware = 0;
        maxSoftware = 1;
        typical = 0.1;
        precision = 3;
        // // iconId = R.drawable.sensor_current;
        break;
      case HUMIDITY_ANALOG:
        name = Strings.data["sensor_name_humidity"];
        unit = Strings.data["sensor_unit_humidity"];
        sensMin = 0;
        sensMax = 100;
        minSoftware = 0;
        maxSoftware = 100;
        typical = 20;
        precision = 1;
        // iconId = R.drawable.sensor_rh;
        break;
      case AMB_TEMPERATURE:
        name = Strings.data["sensor_name_amb_temp"];
        if (LandingController.to.temperatureUnitIsC.isTrue) {
          unit = Strings.data["sensor_temperature_unit_C"];
          sensMin = -10;
          sensMax = 50;
          minSoftware = -10;
          maxSoftware = 50;
        } else {
          unit = Strings.data["sensor_temperature_unit_F"];
          sensMin = 14;
          sensMax = 122;
          minSoftware = 14;
          maxSoftware = 122;
          defaultValue = 14;
        }
        temperature = true;
        typical = 23;
        precision = 1;
        // iconId = R.drawable.sensor_tmp_int;
        break;
      case TURBIDITY:
        name = Strings.data["sensor_name_turbidity"];
        unit = Strings.data["sensor_unit_turbidity"];
        sensMin = 10;
        sensMax = 1450;
        minSoftware = 10;
        maxSoftware = 1450;
        defaultValue = 10;
        typical = 5;
        precision = 1;
        // iconId = R.drawable.sensor_turbidity;
        break;
      case EXTERNAL_A:
        name = Strings.data["sensor_name_external_analog_1"];
        unit = Strings.data["sensor_unit_external_analog"];
        sensMin = 0;
        sensMax = 5;
        minSoftware = 0;
        maxSoftware = 5;
        typical = 2;
        break;
      case EXTERNAL_B:
        name = Strings.data["sensor_name_external_analog_2"];
        unit = Strings.data["sensor_unit_external_analog"];
        sensMin = 0;
        sensMax = 5;
        minSoftware = 0;
        maxSoftware = 5;
        typical = 2;
        // iconId = R.drawable.sensor_general_input;
        break;
      case MICROPHONE:
        name = Strings.data["sensor_name_microphone"];
        unit = Strings.data["sensor_unit_microphone"];
        sensMin = 0;
        sensMax = 3.3;
        minSoftware = 0;
        maxSoftware = 3.3;
        typical = 1.2;
        precision = 3;
        // iconId = R.drawable.sensor_mic_v;
        break;
      case LOW_VOLTAGE:
        name = Strings.data["sensor_name_voltage_low"];
        unit = Strings.data["sensor_unit_low_voltage"];
        sensMin = -500;
        sensMax = 500;
        minSoftware = -500;
        maxSoftware = 500;
        typical = 100;
        precision = 1;
        // iconId = R.drawable.sensor_v_x10;
        break;
      case ACCELERATION:
        name = Strings.data["sensor_name_acceleration"];
        splitCount = 3;
        bytes = 6;
        // iconId = R.drawable.sensor_acceleration;
        break;
      case ACCELERATION_X:
        name = Strings.data["sensor_name_acceleration_x"];
        unit = Strings.data["sensor_unit_acceleration"];
        sensMin = -8;
        sensMax = 8;
        minSoftware = -8;
        maxSoftware = 8;
        typical = 1;
        precision = 3;
        // iconId = R.drawable.sensor_acceleration;
        break;
      case ACCELERATION_Y:
        name = Strings.data["sensor_name_acceleration_y"];
        unit = Strings.data["sensor_unit_acceleration"];
        sensMin = -8;
        sensMax = 8;
        minSoftware = -8;
        maxSoftware = 8;
        typical = 1;
        precision = 3;
        // iconId = R.drawable.sensor_acceleration;
        break;
      case ACCELERATION_Z:
        name = Strings.data["sensor_name_acceleration_z"];
        unit = Strings.data["sensor_unit_acceleration"];
        sensMin = -8;
        sensMax = 8;
        minSoftware = -8;
        maxSoftware = 8;
        typical = 1;
        precision = 3;
        // iconId = R.drawable.sensor_acceleration;
        break;
      case DISSOLVED_OXYGEN:
        name = Strings.data["sensor_name_dissolved_oxygen"];
        unit = Strings.data["sensor_unit_dissolved_oxygen"];
        sensMin = 0;
        sensMax = 14;
        minSoftware = 0;
        maxSoftware = 14;
        typical = 21;
        // iconId = R.drawable.sensor_do2;
        break;
      case CONDUCTIVITY:
        name = Strings.data["sensor_name_conductivity"];
        unit = Strings.data["sensor_unit_conductivity"];
        sensMin = 0;
        sensMax = 20;
        minSoftware = 0;
        maxSoftware = 20;
        typical = 10;
        // iconId = R.drawable.sensor_conductivity;
        break;
      case THERMOCOUPLE:
        name = Strings.data["sensor_name_thermocouple"];
        if (LandingController.to.temperatureUnitIsC.isTrue) {
          unit = Strings.data["sensor_temperature_unit_C"];
          sensMin = -220.0;
          sensMax = 1350.0;
          minSoftware = -220.0;
          maxSoftware = 1350.0;
        } else {
          unit = Strings.data["sensor_temperature_unit_F"];
          sensMin = -364.0;
          sensMax = 2462.0;
          minSoftware = -364.0;
          maxSoftware = 2462.0;
        }
        temperature = true;
        typical = 25;
        precision = 1;
        // iconId = R.drawable.sensor_thermocouple;
        break;
      case ANDROID_LIGHT:
        name = Strings.data["sensor_name_android_light"];
        unit = Strings.data["sensor_unit_light"];
        sensMin = 0;
        sensMax = 60000;
        minSoftware = 0;
        maxSoftware = 60000;
        typical = 10000;
        precision = 0;
        // iconId = R.drawable.sensor_light;
        break;
      case ANDROID_MIC_LEVEL:
        name = Strings.data["sensor_name_android_sound_level"];
        unit = Strings.data["sensor_unit_sound"];
        sensMin = 40;
        sensMax = 100;
        minSoftware = 40;
        maxSoftware = 100;
        typical = 50;
        precision = 1;
        // iconId = R.drawable.sensor_mic;
        break;
      case ANDROID_MIC_PITCH:
//			name = Strings.data["sensor_name_android_pitch"];
        name = Strings.data["sensor_name_android_pitch"];
        unit = Strings.data["sensor_unit_android_pitch"];
        sensMin = 100;
        sensMax = 1200;
        minSoftware = 100;
        maxSoftware = 1200;
        typical = 20;
        precision = 1;
        // iconId = R.drawable.sensor_mic;
        break;
      case ANDROID_ACCELERATION_X:
        name = Strings.data["sensor_name_android_acceleration_x"];
        unit = Strings.data["sensor_unit_acceleration"];
        sensMin = -2;
        sensMax = 2;
        minSoftware = -2;
        maxSoftware = 2;
        typical = 1;
        precision = 3;
        // iconId = R.drawable.sensor_acceleration;
        break;
      case ANDROID_ACCELERATION_Y:
        name =
            Strings.get("sensor_name_android_acceleration_y", "Acceleration Y");
        unit = Strings.get("sensor_unit_acceleration", "m/s²");
        sensMin = -2;
        sensMax = 2;
        minSoftware = -2;
        maxSoftware = 2;
        typical = 1;
        precision = 3;
        // iconId = R.drawable.sensor_acceleration;
        break;
      case ANDROID_ACCELERATION_Z:
        name = Strings.data["sensor_name_android_acceleration_z"];
        unit = Strings.data["sensor_unit_acceleration"];
        sensMin = -2;
        sensMax = 2;
        minSoftware = -2;
        maxSoftware = 2;
        typical = 1;
        precision = 3;
        // iconId = R.drawable.sensor_acceleration;
        break;
      case EXT_CURRENT:
        name = Strings.data["ext_sensor_name_current"];
        unit = Strings.data["ext_sensor_name_current_unit"];
        sensMin = -250;
        sensMax = 250;
        minSoftware = -250;
        maxSoftware = 250;
        typical = 100;
        precision = 1;
        // iconId = R.drawable.sensor_current;
        break;
      case EXT_RESPIRATION:
        name = Strings.data["sensor_name_respiration"];
        unit = Strings.data["sensor_unit_respiration"];
        sensMin = -200;
        sensMax = 200;
        minSoftware = -200;
        maxSoftware = 200;
        typical = 123;
        precision = 1;
        // iconId = R.drawable.sensor_respiration;
        break;
      case EXT_VOLTAGE:
        name = Strings.data["ext_sensor_name_voltage"];
        unit = Strings.data["ext_sensor_unit_voltage"];
        sensMin = -10;
        sensMax = 10;
        typical = 5;
        // iconId = R.drawable.sensor_v;
        break;
      case EXT_MAGNETIC10:
        name = Strings.data["sensor_name_magnetic_field_10"];
        unit = Strings.data["sensor_unit_magnetic_field"];
        sensMin = -10;
        sensMax = 10;
        minSoftware = -10;
        maxSoftware = 10;
        typical = 1.5;
        // iconId = R.drawable.sensor_magnet;
        break;
      case EXT_MAGNETIC02:
        name = Strings.data["sensor_name_magnetic_field_0_2"];
        unit = Strings.data["sensor_unit_magnetic_field"];
        sensMin = -0.2;
        sensMax = 0.2;
        minSoftware = -0.2;
        maxSoftware = 0.2;
        typical = 0.1;
        precision = 3;
        // iconId = R.drawable.sensor_magnet;
        break;
      case EXT_HEARTRATE:
        name = Strings.data["sensor_name_heart_wave"];
        unit = Strings.data["sensor_unit_heart_wave"];
        sensMin = 0;
        sensMax = 5;
        minSoftware = 0;
        maxSoftware = 5;
        typical = 2;
        precision = 0;
        // iconId = R.drawable.sensor_ekg;
        break;
      case EXT_TEMPERATURE:
        name = Strings.data["sensor_name_temperature"];
        if (LandingController.to.temperatureUnitIsC.isTrue) {
          unit = Strings.data["sensor_temperature_unit_C"];
          sensMin = -40.0;
          sensMax = 125.0;
          minSoftware = -40.0;
          maxSoftware = 125.0;
        } else {
          unit = Strings.data["sensor_temperature_unit_F"];
          sensMin = -40.0;
          sensMax = 257.0;
          minSoftware = -40.0;
          maxSoftware = 257.0;
        }
        typical = 30.0;
        break;
      case EXT_CO2:
        name = Strings.data["sensor_name_co2"];
        unit = Strings.data["sensor_unit_co2"];
        sensMin = 0;
        sensMax = 5000;
        minSoftware = 0;
        maxSoftware = 5000;
        typical = 123;
        precision = 0;
        // iconId = R.drawable.sensor_co2;
        break;
      case EXT_SOUND:
        name = Strings.data["ext_sound"];
        unit = Strings.data["ext_sound_unit"];
        sensMin = 25;
        sensMax = 96;
        minSoftware = 25;
        maxSoftware = 96;
        typical = 20;
        defaultValue = 54;
        precision = 1;
        // iconId = R.drawable.sensor_co2;
        break;
      // case EXT_CURRENT12:
      //   name = Strings.data["sensor_name_current12"];
      //   unit = Strings.data["sensor_unit_current12"];
      //   sensMin = -12;
      //   sensMax = 12;
      //   minSoftware = -12;
      //   maxSoftware = 12;
      //   typical = 1.2;
      //   precision = 2;
      //   // iconId = R.drawable.sensor_current;
      //   break;
      // case EXT_VOLTAGE30:
      //   name = Strings.data["sensor_name_voltage"];
      //   unit = Strings.data["sensor_unit_voltage"];
      //   sensMin = -30;
      //   sensMax = 30;
      //   minSoftware = -30;
      //   maxSoftware = 30;
      //   typical = 5;
      //   precision = 1;
      //   // iconId = R.drawable.sensor_v;
      //   break;
      case EXT_PHOTOGATE:
        name = Strings.data["sensor_name_photogate"];
        unit = Strings.data["sensor_unit_photogate"];
        sensMin = 0;
        sensMax = 5;
        minSoftware = 0;
        maxSoftware = 5;
        typical = 2;
        precision = 0;
        // iconId = R.drawable.sensor_photogate;
        break;
      case EXT_PHOTOGATE_HEART:
        name = Strings.data["sensor_name_photogate"];
        unit = Strings.data["sensor_unit_photogate"];
        sensMin = 0;
        sensMax = 5;
        minSoftware = 0;
        maxSoftware = 5;
        typical = 2;
        precision = 0;
        // iconId = R.drawable.sensor_photogate;
        break;
      case EXT_HEARTRATE_RATE:
        name = Strings.data["ext_sensor_name_heart_rate"];
        unit = Strings.data["sensor_unit_heart_rate"];
        sensMin = 40;
        sensMax = 240;
        minSoftware = 40;
        maxSoftware = 240;
        defaultValue = 40;
        typical = 80;
        precision = 0;
        // iconId = R.drawable.sensor_ekg;
        break;

      case FA_FORCE50:
        name = Strings.data["sensor_name_force_50"];
        unit = Strings.data["sensor_unit_force"];
        sensMin = (-FA_FORCE50_LIMIT);
        sensMax = FA_FORCE50_LIMIT;
        typical = 1;
        precision = 1;
        // iconId = R.drawable.sensor_force_x10;
        break;
      case FA_FORCE5:
        name = Strings.data["sensor_name_force_5"];
        unit = Strings.data["sensor_unit_force"];
        sensMin = (-FA_FORCE5_LIMIT);
        sensMax = FA_FORCE5_LIMIT;
        typical = 1;
        precision = 2;
        // iconId = R.drawable.sensor_force;
        break;
      case FA_ACC_X:
        name = Strings.data["sensor_name_acceleration_x"];
        unit = Strings.data["sensor_unit_acceleration"];
        sensMin = (-8);
        sensMax = 8;
        typical = 1;
        precision = 2;
        // iconId = R.drawable.sensor_acceleration;
        break;
      case FA_ACC_Y:
        name = Strings.data["sensor_name_acceleration_y"];
        unit = Strings.data["sensor_unit_acceleration"];
        sensMin = (-8);
        sensMax = 8;
        typical = 1;
        precision = 2;
        // iconId = R.drawable.sensor_acceleration;
        break;
      case FA_ACC_Z:
        name = Strings.data["sensor_name_acceleration_z"];
        unit = Strings.data["sensor_unit_acceleration"];
        sensMin = (-8);
        sensMax = 8;
        typical = 1;
        precision = 2;
        // iconId = R.drawable.sensor_acceleration;
        break;

      case VERNIER_3DACC:
        name = Strings.data["sensor_name_3d_accelerometer"];
        unit = Strings.data["sensor_unit_3d_accelerometer"];
        sensMin = (-76.62);
        sensMax = 75.68;
        typical = 10;
        break;
      case VERNIER_ANEMOMETER:
        name = Strings.data["sensor_name_anemometer"];
        unit = Strings.data["sensor_unit_anemometer"];
        sensMin = (-10);
        sensMax = 40;
        typical = 5;
        break;
      case VERNIER_BAROMETER:
        name = Strings.data["sensor_name_barometer"];
        unit = Strings.data["sensor_unit_barometer_atm"];
        sensMin = 0.809;
        sensMax = 1.194;
        typical = 1;
        break;
      case VERNIER_BLOOD_PRESSURE:
        name = Strings.data["sensor_name_blood_pressure"];
        unit = Strings.data["sensor_unit_blood_pressure"];
        sensMin = 0;
        sensMax = 280.55;
        typical = 90;
        break;
      case VERNIER_CHARGE100:
        name = Strings.data["sensor_name_charge_100"];
        unit = Strings.data["sensor_unit_charge_100"];
        sensMin = (-82.5);
        sensMax = 82.5;
        typical = 10;
        break;
      case VERNIER_CO2_10000:
        name = Strings.data["sensor_name_co2_10000"];
        unit = Strings.data["sensor_unit_co2_ppm"];
        sensMin = 0;
        sensMax = 12500;
        typical = 350;
        break;
      case VERNIER_CO2_100000:
        name = Strings.data["sensor_name_co2_100000"];
        unit = Strings.data["sensor_unit_co2_ppm"];
        sensMin = 0;
        sensMax = 125000;
        typical = 350;
        break;
      case VERNIER_COLORIMETER:
        name = Strings.data["sensor_name_colorimeter"];
        unit = Strings.data["sensor_unit_colorimeter"];
        sensMin = 0;
        sensMax = 142.855;
        typical = 34;
        break;
      case VERNIER_CONDUCTIVITY200:
        name = Strings.data["sensor_name_conductivity_200"];
        unit = Strings.data["sensor_unit_conductivity_us"];
        sensMin = 0;
        sensMax = 328.5;
        typical = 100;
        break;
      case VERNIER_CONDUCTIVITY2000:
        name = Strings.data["sensor_name_conductivity_2000"];
        unit = Strings.data["sensor_unit_conductivity_us"];
        sensMin = 0;
        sensMax = 4800;
        typical = 100;
        break;
      case VERNIER_CONDUCTIVITY20000:
        name = Strings.data["sensor_name_conductivity_20000"];
        unit = Strings.data["sensor_unit_conductivity_us"];
        sensMin = 0;
        sensMax = 45000;
        typical = 100;
        break;
      case VERNIER_CURRENT:
        name = Strings.data["sensor_name_current"];
        unit = Strings.data["sensor_unit_current"];
        sensMin = (-0.625);
        sensMax = 0.625;
        invert = true;
        typical = 0.2;
        break;
      case VERNIER_DISSOLVED_OXYGEN:
        name = Strings.data["sensor_name_dissolved_oxygen"];
        unit = Strings.data["sensor_unit_dissolved_oxygen_mg_L"];
        sensMin = (-0.327);
        sensMax = 0.327;
        typical = 0.1;
        break;
      case VERNIER_EKG:
        name = Strings.data["sensor_name_ekg"];
        unit = Strings.data["sensor_unit_ekg"];
        sensMin = 0;
        sensMax = 5;
        typical = 1.2;
        break;
      case VERNIER_ELECTRODE_AMPLIFIER:
        name = Strings.data["sensor_name_electrode_amplifier"];
        unit = Strings.data["sensor_unit_electrode_amplifier"];
        sensMin = (-559.793);
        sensMax = 1774.582;
        typical = 123;
        break;
      case VERNIER_FLOW_RATE:
        name = Strings.data["sensor_name_flow_rate"];
        unit = Strings.data["sensor_unit_flow_rate"];
        sensMin = 0;
        sensMax = 5;
        typical = 1.2;
        break;
      case VERNIER_FORCE10:
        name = Strings.data["sensor_name_force_10"];
        unit = Strings.data["sensor_unit_force"];
        sensMin = (-12.25);
        sensMax = 12.25;
        invert = true;
        typical = 10;
        break;
      case VERNIER_FORCE50:
        name = Strings.data["sensor_name_force_50"];
        unit = Strings.data["sensor_unit_force"];
        sensMin = (-61.25);
        sensMax = 61.25;
        invert = true;
        typical = 10;
        break;
      case VERNIER_GAS_PRESSURE:
        name = Strings.data["sensor_name_gas_pressure"];
        unit = Strings.data["sensor_unit_gas_pressure"];
        sensMin = (-25.86);
        sensMax = 232.69;
        typical = 10;
        break;
      case VERNIER_LIGHT600:
        name = Strings.data["sensor_name_light_600"];
        unit = Strings.data["sensor_unit_light_lux"];
        sensMin = 0;
        sensMax = 770;
        typical = 123;
        break;
      case VERNIER_LIGHT6000:
        name = Strings.data["sensor_name_light_6000"];
        unit = Strings.data["sensor_unit_light_lux"];
        sensMin = 0;
        sensMax = 8460;
        typical = 1234;
        break;
      case VERNIER_LIGHT150000:
        name = Strings.data["sensor_name_light_15000"];
        unit = Strings.data["sensor_unit_light_lux"];
        sensMin = 0;
        sensMax = 192120;
        typical = 12345;
        break;
      case VERNIER_MAGNETIC_FIELD_03:
        name = Strings.data["sensor_name_magnetic_field_0_3"];
        unit = Strings.data["sensor_unit_magnetic_field"];
        sensMin = (-0.32);
        sensMax = 0.48;
        typical = 0.1;
        break;
      case VERNIER_MAGNETIC_FIELD_64:
        name = Strings.data["sensor_name_magnetic_field_6_4"];
        unit = Strings.data["sensor_unit_magnetic_field"];
        sensMin = (-8.063);
        sensMax = 8.062;
        typical = 1.2;
        break;
      case VERNIER_MICROPHONE:
        name = Strings.data["sensor_name_microphone"];
        unit = Strings.data["sensor_unit_microphone"];
        sensMin = 0;
        sensMax = 5;
        typical = 1.2;
        break;
      case VERNIER_O2_GAS_SENSOR:
        name = Strings.data["sensor_name_O2_gas"];
        unit = Strings.data["sensor_unit_O2_gas"];
        sensMin = 0;
        sensMax = 32.8125;
        typical = 1.2;
        break;
      case VERNIER_ORP:
        name = Strings.data["sensor_name_ORP"];
        unit = Strings.data["sensor_unit_ORP"];
        sensMin = (-559.793);
        sensMax = 1774.582;
        typical = 123;
        break;
      case VERNIER_PH:
        name = Strings.data["sensor_name_ph"];
        unit = Strings.data["sensor_unit_ph"];
        sensMin = -5.47;
        sensMax = 13.72;
        invert = true;
        typical = 7;
        break;
      case VERNIER_PHOTOGATE:
        name = Strings.data["sensor_name_photogate"];
        unit = Strings.data["sensor_unit_photogate"];
        sensMin = 0;
        sensMax = 5;
        typical = 1.2;
        break;
      case VERNIER_RELATIVE_HUMIDITY:
        name = Strings.data["sensor_name_relative_humidity"];
        unit = Strings.data["sensor_unit_humidity"];
        sensMin = -25.81;
        sensMax = 126.34;
        typical = 50;
        break;
      case VERNIER_RESPIRATION:
        name = Strings.data["sensor_name_respiration"];
        unit = Strings.data["sensor_unit_respiration"];
        sensMin = 0;
        sensMax = 1935;
        typical = 123;
        break;
      case VERNIER_SALINITY:
        name = Strings.data["sensor_name_salnity"];
        unit = Strings.data["sensor_unit_salinity"];
        sensMin = 0;
        sensMax = 81.5;
        typical = 40;
        break;
      case VERNIER_SPIROMETER:
        name = Strings.data["sensor_name_spirometer"];
        unit = Strings.data["sensor_unit_spirometer"];
        sensMin = -17.9672;
        sensMax = 17.9673;
        typical = 5;
        break;
      case VERNIER_SOUND_LEVEL:
        name = Strings.data["sensor_name_sound_level"];
        unit = Strings.data["sensor_unit_sound"];
        sensMin = 0;
        sensMax = 500;
        typical = 50;
        break;
      case VERNIER_SOIL_MOISTURE:
        name = Strings.data["sensor_name_soil_moisture"];
        unit = Strings.data["sensor_unit_soil_moisture"];
        sensMin = (-42);
        sensMax = 498;
        typical = 123;
        break;
      case VERNIER_UVA:
        name = Strings.data["sensor_name_uva"];
        unit = Strings.data["sensor_unit_uv_vernier"];
        sensMin = 0;
        sensMax = 19700;
        typical = 1234;
        break;
      case VERNIER_UVB:
        name = Strings.data["sensor_name_uvb"];
        unit = Strings.data["sensor_unit_uv_vernier"];
        sensMin = 0;
        sensMax = 1020;
        typical = 123;
        break;
      case VERNIER_VOLTAGE:
        name = Strings.data["sensor_name_voltage"];
        unit = Strings.data["sensor_unit_voltage"];
        sensMin = -6.25;
        sensMax = 6.25;
        invert = true;
        typical = 1.2;
        break;
      case EXTERNAL_TEMPERATURE:
        name = Strings.data["sensor_name_ext_temp"];
        if (LandingController.to.temperatureUnitIsC.isTrue) {
          unit = Strings.data["sensor_temperature_unit_C"];
          sensMin = -40.0;
          sensMax = 125.0;
          minSoftware = -40.0;
          maxSoftware = 125.0;
        } else {
          unit = Strings.data["sensor_temperature_unit_F"];
          sensMin = -40.0;
          sensMax = 257.0;
          minSoftware = -40.0;
          maxSoftware = 257.0;
        }
        precision = 1;
        typical = 30.0;
        break;
    }

    var sensorData = SensorData();
    sensorData.min = sensMin;
    sensorData.max = sensMax;
    sensorData.minSoftware = minSoftware;
    sensorData.maxSoftware = maxSoftware;
    sensorData.typical = typical;
    sensorData.name = translate(name);
    sensorData.unit = unit;
    sensorData.nameUnit = "$name [$unit]";
    sensorData.nameNlUnit = "$name\n[$unit]";
    sensorData.iconID = 0;
    sensorData.splitCount = splitCount;
    sensorData.precision = precision;
    // data.putBoolean("isAndroid", isAndroid(ID));
    sensorData.isAndroid = false;
    sensorData.isTemperature = temperature;
    sensorData.ID = ID;
    if (temperature) {
      String altUnit = Strings.data["sensor_temperature_unit_F"];
      sensorData.altUnit = altUnit;
      sensorData.nameAltUnit = "$name [$altUnit]";
      sensorData.nameNlAltUnit = "$name\n[$altUnit]";
    }
    sensorData.bytes = bytes;
    sensorData.value = defaultValue;
    return sensorData;
  }

  static double calculateLight(double val) {
    List<double> LIGHT_TABLE = [
      0, 0, 0.00054,
      3714, 2, 0.00215, // 2 lx
      7427, 10, 0.00269, // 10 lx
      11141, 20, 0.02154, // 20 lx
      14855, 100, 0.02693, // 100 lx
      18568, 200, 0.21542, // 100 lx
      22282, 1000, 0.26928, // 1000 lx
      25996, 2000, 2.154, // 2000 lx
      29709, 10000, 2.693, // 10000 lx
      33423, 20000, 18.849, // 20000 lx
      35280 // 55000 lx
    ];

    int tableIndex = 0;
    while (val > LIGHT_TABLE[tableIndex]) {
      tableIndex += 3;
    }
    if (tableIndex != 0) {
      tableIndex -= 3;
    }
    return ((val - LIGHT_TABLE[tableIndex]) * LIGHT_TABLE[tableIndex + 2]) +
        LIGHT_TABLE[tableIndex + 1];
  }

  static double calculateGpsLatLon(String val) {
    String integerPart =
        int.parse(val.substring(0, 2), radix: 16).toRadixString(10);
    double decimalPart =
        int.parse(int.parse(val.substring(2, 6), radix: 16).toRadixString(10)) *
            0.00001666667;

    String a4 = val.substring(6, 8);
    if (a4 == "45") {
      a4 = "E";
    } else if (a4 == "4e") {
      a4 = "N";
    } else if (a4 == "53") {
      a4 = "S";
    } else if (a4 == "57") {
      a4 = "W";
    }

    // Safely extract decimal part - ensure we always have a decimal point
    String decimalPartStr = decimalPart.toStringAsFixed(10);
    List<String> decimalParts = decimalPartStr.split(".");
    String decimalFraction = decimalParts.length > 1 ? decimalParts[1] : "0";

    if (a4 == "E" || a4 == "N" || a4 == "00") {
      return double.parse("$integerPart.$decimalFraction");
    } else {
      return -double.parse("$integerPart.$decimalFraction");
    }
  }

  static double calculateExtZeroCenterSensors(double val, double virtualZero) {
    return (val - 27306) * virtualZero;
  }

  static double calculatePositiveLinearSensors(double val, double minDigital,
      double maxDigital, double minRange, double maxRange) {
    return ((val - minDigital) /
            (maxDigital - minDigital) *
            (maxRange - minRange)) +
        minRange;
  }

  static double calculateNegativeLinearSensors(double val, double minDigital,
      double maxDigital, double minRange, double maxRange) {
    return ((minDigital - val) /
            (minDigital - maxDigital) *
            (maxRange - minRange)) +
        minRange;
  }

  static double convert(int iVal, SensorData sensorData) {
    if (iVal == 65535 ||
        iVal == -65535 &&
            (sensorData.ID == HEARTRATE ||
                sensorData.ID == UV ||
                sensorData.ID == IR_TEMP ||
                sensorData.ID == EXTERNAL_TEMPERATURE ||
                sensorData.ID == LIGHT ||
                sensorData.ID == VOLTAGE ||
                sensorData.ID == CURRENT ||
                sensorData.ID == EXTERNAL_A ||
                sensorData.ID == EXTERNAL_B ||
                sensorData.ID == MICROPHONE ||
                sensorData.ID == LOW_VOLTAGE ||
                sensorData.ID == ACCELERATION ||
                sensorData.ID == ACCELERATION_X ||
                sensorData.ID == ACCELERATION_Y ||
                sensorData.ID == ACCELERATION_Z ||
                sensorData.ID == PULSE ||
                sensorData.ID == PULSE_WAVEFORM ||
                sensorData.ID == EXT_CURRENT ||
                sensorData.ID == EXT_RESPIRATION ||
                sensorData.ID == EXT_VOLTAGE ||
                sensorData.ID == EXT_MAGNETIC10 ||
                sensorData.ID == EXT_MAGNETIC02 ||
                sensorData.ID == EXT_HEARTRATE ||
                sensorData.ID == EXT_TEMPERATURE ||
                sensorData.ID == EXT_CO2 ||
                sensorData.ID == EXT_SOUND ||
                sensorData.ID == EXT_PHOTOGATE ||
                sensorData.ID == EXT_PHOTOGATE_HEART ||
                sensorData.ID == EXT_HEARTRATE_RATE)) //0xffff
    {
      return 0;
    } else if ((iVal == 32768 || iVal == -32768) &&
        (sensorData.ID == PH ||
            sensorData.ID == BAROMETER ||
            sensorData.ID == HUMIDITY ||
            // sensorData.ID == GPS ||
            // sensorData.ID == GPS_ANGLE ||
            // sensorData.ID == GPS_LAT ||
            // sensorData.ID == GPS_LONG ||
            // sensorData.ID == GPS_SPEED ||
            sensorData.ID == COLORIMETER ||
            sensorData.ID == COLORIMETER_B ||
            sensorData.ID == COLORIMETER_G ||
            sensorData.ID == COLORIMETER_R ||
            sensorData.ID == SOUND ||
            sensorData.ID == DISTANCE ||
            sensorData.ID == AIRPRESSURE ||
            sensorData.ID == AMB_TEMPERATURE ||
            sensorData.ID == TURBIDITY ||
            sensorData.ID == DISSOLVED_OXYGEN ||
            sensorData.ID == CONDUCTIVITY ||
            sensorData.ID == THERMOCOUPLE ||
            sensorData.ID == HEARTRATE ||
            sensorData.ID == EXT_HEARTRATE ||
            sensorData.ID == EXT_HEARTRATE_RATE)) {
      if (sensorData.ID == BAROMETER ||
          sensorData.ID == EXT_HEARTRATE ||
          sensorData.ID == EXT_HEARTRATE_RATE ||
          sensorData.ID == HEARTRATE ||
          sensorData.ID == SOUND) {
        return sensorData.minSoftware!;
      }
      return 0;
    }
    double pval;
    double val = double.parse(iVal.toString());
    double sval = iVal.roundToDouble();
    // short uval = (short) iVal;

    switch (sensorData.ID) {
      case NO_SENS:
        return 0;

      case IR_TEMP:
        double value =
            calculatePositiveLinearSensors(val, 5157, 32657, -170, 380);
        if (LandingController.to.temperatureUnitIsC.value) {
          return value;
        } else {
          return Helpers.celsiusToFahrenheit(value);
        }
      // return (val / 50.0 - 273.15);

      // case AMB_TEMP_SHT:
      //   return (0.01 * val - 39.7);

      case UV:
        // return calculatePositiveLinearSensors(val, 21845, 42223, 0, 14);
        pval = (val - 21845) * 458 * 150 / 1000000 / 100;
        return max(0, pval);

      case PH:
        // return calculatePositiveLinearSensors(val, 0, 1400, 0, 14);
        return (val / 1000.0);

      case CO:
        return (val / 1000.0);

      case CURRENT:
        return calculatePositiveLinearSensors(val, 14318, 51218, -1, 1);

      case MINI_CURRENT:
//			return( val * 0.5 / 35170);
        return (val * 0.5 / 28558);

      case VOLTAGE:
        return calculatePositiveLinearSensors(
            val, 15527, 50009, sensorData.min!, sensorData.max!);

      // case EXT_VOLTAGE30:
      //   return ((val - 27306) * 119 / 10000.0) / 10.0;

      case MINI_VOLTAGE:
        return ((val - 32768) * 1084.0 / 10000.0) / 100.0;

      case LOW_VOLTAGE:
        return calculatePositiveLinearSensors(val, 15163, 50373, -500, 500);
      // return ((val - 32768) * 2840.0 / 10000.0) / 10.0;

      case DISTANCE:
        return calculatePositiveLinearSensors(val, 400, 10000, 0.4, 10);
      // if (val > 10000) return (0);
      // return (val / 1000.0);

      case HUMIDITY_ANALOG:
        val = min(56848.0, max(12288.0, val));
        return ((val - 12288) * 224.0 / 10000.0) / 10.0;

      case Sensors.BAROMETER:
        return calculatePositiveLinearSensors(val, 5000, 11500, 500, 1150);
      //return (val / 10.0);

      case Sensors.HUMIDITY:
        return calculatePositiveLinearSensors(val, 0, 1000, 0, 100);
      // return (val / 10.0);

      case Sensors.SOUND:
        return calculatePositiveLinearSensors(val, 540, 960, 54, 96);
      // return (val / 10.0);

      case Sensors.EXT_SOUND:
        return (val / 10.0);

      case Sensors.TURBIDITY:
        // return calculatePositiveLinearSensors(val, 100, 14500, 10, 1450);
        return val / 10;

      case Sensors.GPS_SPEED:
      case Sensors.GPS_ANGLE:
        return (val / 10.0);

      case Sensors.MICROPHONE:
        return calculatePositiveLinearSensors(val, 0, 65535, 0, 3.3);
      // return (val * 3.3 / 0xFFFF);

      case Sensors.AIRPRESSURE:
        return calculatePositiveLinearSensors(val, 0, 3000, 0, 300);

      case Sensors.EXTERNAL_TEMPERATURE:
        double value = calibrateExtTemp(iVal);
        if (LandingController.to.temperatureUnitIsC.value) {
          return value;
        } else {
          return Helpers.celsiusToFahrenheit(value);
        }

      // return (calibrateExtTemp(iVal));
      // case Sensors.AMB_TEMP_NTC:
      //   return (calibrateAmbTempNTC(iVal));

      case Sensors.THERMOCOUPLE:
        double value = sval / 10.0;
        if (LandingController.to.temperatureUnitIsC.value) {
          return value;
        } else {
          return Helpers.celsiusToFahrenheit(value);
        }

      case Sensors.ION:
        return sval / 10.0;

      case Sensors.AMB_TEMPERATURE:
        // return calculateNegativeLinearSensors(val, 65436, 500, -10, 50);
        sval = sval / 10;
        if (!LandingController.to.temperatureUnitIsC.value) {
          sval = Helpers.celsiusToFahrenheit(sval);
        }
        return sval;

      // case Sensors.EXT_TEMP_NTC:
      //   return (calibrateExtTempNTC(iVal));

      case EXT_HEARTRATE_RATE:
        var value = calculatePositiveLinearSensors(val, 40, 240, 40, 240);
        if (value > 240) {
          return 0;
        }
        return value;
      // if (val > 1000) return (0);
      // return (val);
      case Sensors.PULSE_WAVEFORM:
        return 3 / 65520 * val;
      // return calculatePositiveLinearSensors(val, 0, 65535, 0, 3.3);
      // return (val * 3.3 / 65536);

      case Sensors.FA_FORCE50:
        return max(min((val - FA_FORCE50_OFFSET) / 28.5, FA_FORCE50_LIMIT),
            -FA_FORCE50_LIMIT);

      case Sensors.FA_FORCE5:
        return max(min((val - FA_FORCE5_OFFSET) / 285.0, FA_FORCE5_LIMIT),
            -FA_FORCE5_LIMIT);

      case EXT_PHOTOGATE:
        // return calculatePositiveLinearSensors(val, 0, 49648, 0, 5);
        return (val * 92.0 / 10000.0) / 100.0;

      case Sensors.EXTERNAL_A:
      case Sensors.EXTERNAL_B:
      case EXT_HEARTRATE:
      case EXT_PHOTOGATE_HEART:
        return (val * 92.0 / 10000.0) / 100.0;

      case Sensors.COLORIMETER_R:
      case Sensors.COLORIMETER_G:
      case Sensors.COLORIMETER_B:
        return calculatePositiveLinearSensors(val, 0, 1000, 0, 100) / 10;

      case Sensors.DISSOLVED_OXYGEN:
        return calculatePositiveLinearSensors(val, 0, 1400, 0, 14);
      // return (val / 100.0);

      case Sensors.BAROMETER_KPA:
        return (val / 100.0);

      case Sensors.CONDUCTIVITY:
        return calculatePositiveLinearSensors(val, 0, 2000, 0, 20);
      // return (val / 100.0);

      case Sensors.ACCELERATION_X:
      case Sensors.ACCELERATION_Y:
      case Sensors.ACCELERATION_Z:
        return (val * 0.0002442);

      case Sensors.FA_ACC_X:
      case Sensors.FA_ACC_Y:
        return calculatePositiveLinearSensors(val, 32720, 32816, -8, 8);
      // case Sensors.FA_ACC_Z:
      // 	// iVal = iVal >> 4;
      // 	if ((iVal & 0x0800) != 0)
      // 		temp = -7987;
      // 	iVal = iVal & 0x07FF;
      // 	return (temp + 3.9 * iVal) / 1000;
      // 	// return iVal;

      case EXT_CURRENT:
        return calculateExtZeroCenterSensors(val, 0.01161);
      // return ((val - 27306) * 1161 / 10000.0) / 10.0;

      // case EXT_CURRENT12:
      //   return ((val - 27306) * 505 / 10000.0) / 100.0;

      case EXT_RESPIRATION:
        return calculateExtZeroCenterSensors(val, 0.00805);

      // return ((val - 27306) * 805 / 10000.0) / 10.0;

      case EXT_VOLTAGE:
        return calculateExtZeroCenterSensors(val, 0.000415);

      // return ((val - 27306) * 415 / 10000.0) / 100.0;

      case EXT_MAGNETIC10:
        return calculateExtZeroCenterSensors(val, 0.000458);
      // return ((val - 27306) * 458 / 10000.0) / 100.0;

      case EXT_MAGNETIC02:
        return calculateExtZeroCenterSensors(val, 0.000077) / 10;
      // return ((val - 27306) * 77 / 10000.0) / 1000.0;

      case EXT_CO2:
        // return calculatePositiveLinearSensors(val, 0, 4920, 0, 5000);
        return (min(5000.0, val * 0.183));

      case EXT_TEMPERATURE:
        double value = calibrate_ext_ExtTemp(iVal);
        if (LandingController.to.temperatureUnitIsC.value) {
          return value;
        } else {
          return Helpers.celsiusToFahrenheit(value);
        }
      // return (calibrateGlobisensTemp(iVal));

      case LIGHT:
        if (val == 65535) {
          return 0;
        } else {
          return calculateLight(val);
        }

      case PULSE:
      case HEARTRATE:
        if (val > 240) return 0;
        return val;

      default:
        return (val / 100.0);
    }
  }

  static double calibrateExtTemp(int index) {
    int INDEX_STEPS = 34;

    List<double> TABLE = [
      62587.0,
      -40.0,
      0.0056201,
      61698.0,
      -35.0,
      0.0046082,
      60613.0,
      -30.0,
      0.0038338,
      59309.0,
      -25.0,
      0.0032394,
      57765.0,
      -20.0,
      0.0027826,
      55968.0,
      -15.0,
      0.0024331,
      53913.0,
      -10.0,
      0.0021680,
      51607.0,
      -5.0,
      0.0019704,
      49069.0,
      0.0,
      0.0018274,
      46333.0,
      5.0,
      0.0017310,
      43445.0,
      10.0,
      0.0016739,
      40458.0,
      15.0,
      0.0016514,
      37430.0,
      20.0,
      0.0016621,
      34422.0,
      25.0,
      0.0017029,
      31486.0,
      30.0,
      0.0017738,
      28667.0,
      35.0,
      0.0018773,
      26003.0,
      40.0,
      0.0020116,
      23518.0,
      45.0,
      0.0021819,
      21226.0,
      50.0,
      0.0023894,
      19134.0,
      55.0,
      0.0026435,
      17242.0,
      60.0,
      0.0029314,
      15537.0,
      65.0,
      0.0032898,
      14017.0,
      70.0,
      0.0036839,
      12659.0,
      75.0,
      0.0041677,
      11460.0,
      80.0,
      0.0046932,
      10394.0,
      85.0,
      0.0053328,
      9457.0,
      90.0,
      0.0060505,
      8630.0,
      95.0,
      0.0068394,
      7899.0,
      100.0,
      0.0078301,
      7261.0,
      105.0,
      0.0088086,
      6693.0,
      110.0,
      0.0101603,
      6201.0,
      115.0,
      0.0114695,
      5765.0,
      120.0,
      0.0128549,
      5376.0
    ];

    int iStep = 0;
    if (index > TABLE[0]) return (TABLE[0 * 3 + 1]);
    if (index < TABLE[(INDEX_STEPS - 1) * 3 + 0]) {
      return (TABLE[(INDEX_STEPS - 2) * 3 + 1]);
    } // was INDEX_STEPS-1
    while (TABLE[iStep * 3] > index) {
      iStep++;
    } // when stopped value is between STEP[iStep+1] &
    // STEP[iStep]
    double LowVal = TABLE[(iStep - 1) * 3 + 1];
    double Multiplier = TABLE[(iStep - 1) * 3 + 2];
    int notches = TABLE[(iStep - 1) * 3 + 0].round() - index;
    return (LowVal + notches * Multiplier);
  }

  static double calibrateAmbTempNTC(int index) {
    int INDEX_STEPS = 13;

    List<double> TABLE = [
      53873,
      -10,
      20202,
      51398,
      -5,
      18245,
      48657,
      0,
      16857,
      45691,
      5,
      15931,
      42552,
      10,
      15403,
      39306,
      15,
      15221,
      36021,
      20,
      15366,
      32769,
      25,
      15817,
      29606,
      30,
      16576,
      26590,
      35,
      17652,
      23757,
      40,
      19091,
      21135,
      45,
      20858,
      18738
    ];

    int iStep = 0;
    if (index > TABLE[0]) return (TABLE[0 * 3 + 1]);
    if (index < TABLE[(INDEX_STEPS - 1) * 3 + 0]) {
      return (TABLE[(INDEX_STEPS - 1) * 3 + 1]);
    }
    while (TABLE[iStep * 3] > index) {
      iStep++;
    } // when stopped value is between STEP[iStep+1] &
    // STEP[iStep]
    double LowVal = TABLE[(iStep - 1) * 3 + 1];
    double Multiplier = TABLE[(iStep - 1) * 3 + 2] / 10000000;
    int notches = TABLE[(iStep - 1) * 3 + 0].round() - index;
    return (LowVal + notches * Multiplier);
  }

  static double calibrateExtTempNTC(int index) {
    int INDEX_STEPS = 34;

    List<double> TABLE = [
      63772,
      -40,
      76172,
      63116,
      -35,
      58802,
      62265,
      -30,
      45907,
      61176,
      -25,
      36750,
      59816,
      -20,
      29891,
      58143,
      -15,
      24959,
      56140,
      -10,
      21232,
      53785,
      -5,
      18606,
      51097,
      0,
      16690,
      48102,
      5,
      15422,
      44860,
      10,
      14606,
      41436,
      15,
      14249,
      37927,
      20,
      14263,
      34422,
      25,
      14612,
      31000,
      30,
      15314,
      27735,
      35,
      16410,
      24688,
      40,
      17862,
      21889,
      45,
      19760,
      19358,
      50,
      22105,
      17097,
      55,
      25076,
      15103,
      60,
      28624,
      13356,
      65,
      32893,
      11836,
      70,
      38107,
      10524,
      75,
      44296,
      9395,
      80,
      51149,
      8417,
      85,
      59727,
      7580,
      90,
      69437,
      6860,
      95,
      80817,
      6241,
      100,
      94093,
      5710,
      105,
      109290,
      5253,
      110,
      126751,
      4858,
      115,
      146877,
      4518,
      120,
      171320,
      4226
    ];

    int iStep = 0;
    if (index > TABLE[0]) return (TABLE[0 * 3 + 1]);
    if (index < TABLE[(INDEX_STEPS - 1) * 3 + 0]) {
      return (TABLE[(INDEX_STEPS - 1) * 3 + 1]);
    }
    while (TABLE[iStep * 3] > index) {
      iStep++;
    } // when stopped value is between STEP[iStep+1] &
    // STEP[iStep]
    double LowVal = TABLE[(iStep - 1) * 3 + 1];
    double Multiplier = TABLE[(iStep - 1) * 3 + 2] / 10000000;
    int notches = TABLE[(iStep - 1) * 3 + 0].round() - index;
    return (LowVal + notches * Multiplier);
  }

  static double calibrateLight(int index) {
    int INDEX_STEPS = 11;

    List<double> TABLE = [
      // first 7 /100,000 ; last 3 /1,000
      0, 0, 54, 3714, 2, 215, // 2 lx
      7427, 10, 269, // 10 lx
      11141, 20, 2154, // 20 lx
      14855, 100, 2693, // 100 lx
      18568, 200, 21542, // 100 lx
      22282, 1000, 26928, // 1000 lx
      25996, 2000, 215400, // 2000 lx
      29709, 10000, 269300, // 10000 lx
      33423, 20000, 1884900, // 20000 lx
      35280, 55000 // 55000 lx
    ];

    int iStep = 0;
    if (index <= TABLE[0]) return (TABLE[0 * 3 + 1]);
    if (index > TABLE[(INDEX_STEPS - 1) * 3 + 0]) {
      return (TABLE[(INDEX_STEPS - 1) * 3 + 1]);
    }
    while (TABLE[iStep * 3] < index) {
      iStep++;
    } // when stopped value is between STEP[iStep+1] &
    // STEP[iStep]
    double LowVal = 0;
    try {
      LowVal = TABLE[(iStep - 1) * 3 + 1];
    } catch (e) {
      debugPrint("Log.d *** calibrateLight $index=%d $iStep=%d");
      debugPrint("Log.w Error= $e");

      return (0);
    }
    double Multiplier = TABLE[(iStep - 1) * 3 + 2] / 100000;
    int notches = index - TABLE[(iStep - 1) * 3 + 0].round();
    return (LowVal + notches * Multiplier);
  }

  static double calibrateGlobisensTemp(int index) {
    int INDEX_STEPS = 31;

    List<double> TABLE = [
      52465,
      -25,
      36619,
      51100,
      -20,
      31455,
      49510,
      -15,
      27505,
      47692,
      -10,
      24508,
      45652,
      -5,
      22274,
      43408,
      0,
      20658,
      40987,
      5,
      19567,
      38432,
      10,
      18922,
      35789,
      15,
      18668,
      33111,
      20,
      18789,
      30450,
      25,
      19250,
      27853,
      30,
      20052,
      25359,
      35,
      21221,
      23003,
      40,
      22740,
      20804,
      45,
      24665,
      18777,
      50,
      27010,
      16926,
      55,
      29883,
      15253,
      60,
      33138,
      13744,
      65,
      37189,
      12399,
      70,
      41644,
      11199,
      75,
      41644,
      10137,
      80,
      53053,
      9195,
      85,
      60284,
      8366,
      90,
      68397,
      7635,
      95,
      77315,
      6988,
      100,
      88514,
      6423,
      105,
      99576,
      5921,
      110,
      114855,
      5486,
      115,
      129656,
      5100,
      120,
      145316,
      4756
    ];

    int iStep = 0;
    if (index > TABLE[0]) return (TABLE[0 * 3 + 1]);
    if (index < TABLE[(INDEX_STEPS - 1) * 3 + 0]) {
      return (TABLE[(INDEX_STEPS - 1) * 3 + 1]);
    }
    while (TABLE[iStep * 3] > index) {
      iStep++;
    } // when stopped value is between STEP[iStep+1] &
    // STEP[iStep]
    double LowVal = TABLE[(iStep - 1) * 3 + 1];
    double Multiplier = TABLE[(iStep - 1) * 3 + 2] / 10000000;
    int notches = TABLE[(iStep - 1) * 3 + 0].round() - index;
    return (LowVal + notches * Multiplier);
  }

  static double calibrate_ext_ExtTemp(int index) {
    int INDEX_STEPS = 31;

    List<double> TABLE = [
      52465,
      -25,
      0.0036619,
      51100,
      -20,
      0.0031455,
      49510,
      -15,
      0.0027505,
      47692,
      -10,
      0.0024508,
      45652,
      -5,
      0.0022274,
      43408,
      0,
      0.0020658,
      40987,
      5,
      0.0019567,
      38432,
      10,
      0.0018922,
      35789,
      15,
      0.0018668,
      33111,
      20,
      0.0018789,
      30450,
      25,
      0.0019250,
      27853,
      30,
      0.0020052,
      25359,
      35,
      0.0021221,
      23003,
      40,
      0.0022740,
      20804,
      45,
      0.0024665,
      18777,
      50,
      0.0027010,
      16926,
      55,
      0.0029883,
      15253,
      60,
      0.0033138,
      13744,
      65,
      0.0037189,
      12399,
      70,
      0.0041644,
      11199,
      75,
      0.0041644,
      10137,
      80,
      0.0053053,
      9195,
      85,
      0.0060284,
      8366,
      90,
      0.0068397,
      7635,
      95,
      0.0077315,
      6988,
      100,
      0.0088514,
      6423,
      105,
      0.0099576,
      5921,
      110,
      0.0114855,
      5486,
      115,
      0.0129656,
      5100,
      120,
      0.0145316,
      4756
    ];

    int iStep = 0;
    if (index > TABLE[0]) return (TABLE[0 * 3 + 1]);
    if (index < TABLE[(INDEX_STEPS - 1) * 3 + 0]) {
      return (TABLE[(INDEX_STEPS - 2) * 3 + 1]);
    } // was INDEX_STEPS-1
    while (TABLE[iStep * 3] > index) {
      iStep++;
    } // when stopped value is between STEP[iStep+1] &
    // STEP[iStep]
    double LowVal = TABLE[(iStep - 1) * 3 + 1];
    double Multiplier = TABLE[(iStep - 1) * 3 + 2];
    int notches = TABLE[(iStep - 1) * 3 + 0].round() - index;
    return (LowVal + notches * Multiplier);
  }

  static String getSensorDisplayName(int sensorId) {
    switch (sensorId) {
      case UV:
        return translate("UV");
      case PH:
        return translate("pH");
      case BAROMETER:
        return translate("Barometer");
      case IR_TEMP:
        return translate("IR_Temperature");
      case HUMIDITY:
        return translate("Humidity");
      case GPS:
        return translate("GPS");
      case GPS_LAT:
        return translate("GPS_latitude");
      case GPS_LONG:
        return translate("GPS_longitude");
      case GPS_SPEED:
        return translate("GPS_speed");
      case GPS_ANGLE:
        return translate("GPS_angle");
      case EXTERNAL_TEMPERATURE:
        return translate("Ext._Temperature");
      case COLORIMETER:
        return translate("Colorimeter");
      case COLORIMETER_R:
        return translate("Colorimeter_red");
      case COLORIMETER_G:
        return translate("Colorimeter_green");
      case COLORIMETER_B:
        return translate("Colorimeter_blue");
      case LIGHT:
        return translate("Light");
      case SOUND:
        return translate("Sound");
      case HEARTRATE:
        return translate("Heart_rate");
      case PULSE:
        return translate("Pulse");
      case PULSE_WAVEFORM:
        return translate("Pulse_waveform");
      case DISTANCE:
        return translate("Distance");
      case AIRPRESSURE:
        return translate("Air_Pressure");
      case VOLTAGE:
        return translate("Voltage");
      case CURRENT:
        return translate("Current");
      case AMB_TEMPERATURE:
        return translate("Amb._Temperature");
      case TURBIDITY:
        return translate("Turbidity");
      case EXTERNAL_A:
        return translate("Ext._Analog_sensor_1");
      case MICROPHONE:
        return translate("Microphone");
      case LOW_VOLTAGE:
        return translate("Low_Voltage");
      case ACCELERATION:
        return translate("Acceleration");
      case ACCELERATION_X:
        return translate("Acceleration_X");
      case ACCELERATION_Y:
        return translate("Acceleration_Y");
      case ACCELERATION_Z:
        return translate("Acceleration_Z");
      case EXTERNAL_B:
        return translate("Ext._Analog_sensor_2");
      case DISSOLVED_OXYGEN:
        return translate("Dissolved_Oxygen");
      case CONDUCTIVITY:
        return translate("Conductivity");
      case THERMOCOUPLE:
        return translate("Thermocouple");
      case EXT_CURRENT:
        return translate("Current_250mA");
      case EXT_RESPIRATION:
        return translate("Respiration");
      case EXT_VOLTAGE:
        return translate("Voltage_10V");
      case EXT_MAGNETIC10:
        return translate("Magnetic_10mT");
      case EXT_MAGNETIC02:
        return translate("Magnetic_0.2mT");
      case EXT_HEARTRATE:
        return translate("Heartrate");
      case EXT_TEMPERATURE:
        return translate("Temperature");
      case EXT_CO2:
        return translate("CO2");
      case EXT_SOUND:
        return translate("Ext._Sound");
      case EXT_PHOTOGATE:
        return translate("Photogate");
      default:
        return "Unknown Sensor";
    }
  }
}
