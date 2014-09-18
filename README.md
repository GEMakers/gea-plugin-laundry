# Laundry
**General Electric Appliances Laundry Software Development Kit**

This node.js package provides functionality for communicating with a clothes washer or dryer via the [General Electric Appliance Software Development Kit](https://github.com/GEMakers/gea-sdk). In order to use this software, you must first connect your appliance to your computer using the [Green Bean](https://github.com/GEMakers/green-bean).

&#x26a0; WARNING: To prevent a risk of personal injury or property damage use this device and the API to modify the functionality of your GE Appliance only as directed in the [Guide to Safe and Reliable Operation](#guide-to-safe-and-reliable-operation). While an appliance operates in Consumer Mode, the control software applies algorithms that help protect consumers from a risk of personal injury or property damage. However, in Native Mode, these algorithms are not active. Therefore you must follow all guidelines for Safe/Reliable Operation detailed below to prevent a risk of personal injury or property damage that can arise during Native Mode Operation.

## Guide to Safe and Reliable Operation
The interface between the green bean and the range can take place while the range is in either a consumer or a native mode.


**Consumer mode** allows developers to access the high-level algorithms of an appliance, such as sensor dry and timed dry.
In consumer mode a user is unable change the low level functions that govern how the cook cycle runs.


**Native mode** allows a developer to create the low-level algorithms of an appliance, such as direct control of motors, fans, actuators, heaters, and other controlled devices.
While in native mode, high-level algorithms, such as sensor dry and timed dry, are not operational.
Native mode allows a developer to, for example, create a new drying algorithm by controlling the loads in a desired manner.
While operating in native mode, the developer must adhere to the following rules:

1. Operation of Heaters and Drum Motor is prohibited with the door open.  Hardware interlock exists that prevents operation unless door is closed but relays should not be driven prior to door being closed to prevent the door contact from switching the current.
1. Heaters should only be operated when drum is moving in a clockwise direction.
1. A hardware interlock (centrifugal switch) exists that blocks the heater operation unless the drum motor is running. Drum motor should be running (in a clockwise direction) for a period of time to allow the centrifugal switch to close prior to turning on heaters. Likewise, heaters should be turned off prior to stopping the drum motor and opening the centrifugal switch. This prevents the centrifugal switch from switching current and increases overall reliability.
1. At the end of a cycle continue to rotate without heater operation for a period of time to reduce temperatures of clothing.
1. Do not operate the unit without appropriate oversight.  
1. Valve operations should be time limited to prevent water damage.
1. To prevent dryer damage, drum motor relay must be off for 6 seconds before changing directions and reenergizing the relay in order to allow drum to come to a complete stop prior to changing direction.
1. Excessive relay cycling can shorten the life of the relays.
1. To maintain native mode operation, the native mode command must be sent at least once every 5 minutes (2.5 minute periodic rate is recommended).

## Overview

1. [Using the Software](#using-the-software)
  - [laundry.machineStatus](#laundrymachinestatus)
  - [laundry.machineSubCycle](#laundrymachinesubcycle)
  - [laundry.endOfCycle](#laundryendofcycle)
  - [laundry.cycleCount](#laundrycyclecount)
  - [laundry.dryerServiceErrorCodes](#laundrydryerserviceerrorcodes)
  - [laundry.dsmOverridesAllowed](#laundrydsmoverridesallowed)
  - [laundry.maximumWaterTemperature](#laundrymaximumwatertemperature)
  - [laundry.timeRemainingInSeconds](#laundrytimetemaininginseconds)
  - [laundry.tankStatus](#laundrytankstatus)
  - [laundry.tankSelected](#laundrytankselected)
  - [laundry.cycleSelected](#laundrycycleselected)
  - [laundry.washerUserInterfaceServiceErrorCodes](#laundrywasheruserinterfaceserviceerrorcodes)
  - [laundry.washerInverterServiceErrorCodes](#laundrywasherinverterserviceerrorcodes)
  - [laundry.washerMainControlServiceErrorCodes](#laundrywashermaincontrolserviceerrorcodes)
  - [laundry.operatingMode](#laundryoperatingmode)
  - [laundry.dryerCriticalResponseEnabled](#laundrydryercriticalresponseenabled)
  - [laundry.delayTimeRemainingInMinutes](#laundrydelaytimeremaininginminutes)
1. [Appendix](#appendix)
  - [Machine status](#machine-status)
  - [Machine sub cycle](#machine-sub-cycle)
  - [End of cycle](#end-of-cycle)
  - [Dryer error codes](#dryer-error-codes)
  - [DSM overrides allowed](#dsm-overrides-allowed)
  - [Water temperature](#water-temperature)
  - [Tank type](#tank-type)
  - [Cycle selected](#cycle-selected)
  - [Washer user interface error codes](#washer-user-interface-error-codes)
  - [Washer inverter error codes](#washer-inverter-error-codes)
  - [Washer main control error codes](#washer-main-control-error-codes)
  - [Operating mode](#operating-mode)
  - [Critical response](#critical-response)

### Using the Software
Below are a few node.js applications that demonstrate how to use this package to interact with a clothes washer or dryer.

### *laundry.machineStatus*
The machine status is a read-only integer value of the [machine status](#machine-status) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.machineStatus.read(function (value) {
        console.log("machine status is:", value);
    });

    laundry.machineStatus.subscribe(function (value) {
        console.log("machine status changed:", value);
    });
});
```

### *laundry.machineSubCycle*
The machine sub cycle is a read-only integer value of the [machine sub cycle](#machine-sub-cycle) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.machineSubCycle.read(function (value) {
        console.log("machien sub-cycle is:", value);
    });

    laundry.machineSubCycle.subscribe(function (value) {
        console.log("machien sub-cycle changed:", value);
    });
});
```

### *laundry.endOfCycle*
The end of cycle is a read-only integer value of the [end of cycle](#end-of-cycle) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.endOfCycle.read(function (value) {
        console.log("end of cycle is:", value);
    });

    laundry.endOfCycle.subscribe(function (value) {
        console.log("end of cycle changed:", value);
    });
});
```

### *laundry.cycleCount*
The cycle count is a read-only unsigned integer representing a running total of the number of cycles that have been run.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.cycleCount.read(function (value) {
        console.log("cycle count is:", value);
    });

    laundry.cycleCount.subscribe(function (value) {
        console.log("cycle count changed:", value);
    });
});
```

### *laundry.dryerServiceErrorCodes*
The dryer service error codes are a read-only integer representing the [dryer error codes](#dryer-error-codes) bit field.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.dryerServiceErrorCodes.read(function (value) {
        console.log("dryer service error codes are:", value);
    });

    laundry.dryerServiceErrorCodes.subscribe(function (value) {
        console.log("dryer service error codes changed:", value);
    });
});
```

### *laundry.dsmOverridesAllowed*
The DSM overrides allowed is an integer value of the [DSM overrides allowed](#dsm-overrides-allowed) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.dsmOverridesAllowed.read(function (value) {
        console.log("DSM overrides allowed is:", value);
    });

    laundry.dsmOverridesAllowed.subscribe(function (value) {
        console.log("DSM overrides allowed changed:", value);
    });

    laundry.dsmOverridesAllowed.write(1);
});
```

### *laundry.maximumWaterTemperature*
The maximum water temperature is an integer value of the [water temperature](#water-temperature) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.maximumWaterTemperature.read(function (value) {
        console.log("maximum water temperature is:", value);
    });

    laundry.maximumWaterTemperature.subscribe(function (value) {
        console.log("maximum water temperature changed:", value);
    });

    laundry.maximumWaterTemperature.write(6);
});
```

### *laundry.timeRemainingInSeconds*
The time remaining is a read-only integer representing the amount of time remaining in the current cycle (in seconds).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.timeRemainingInSeconds.read(function (value) {
        console.log("time remaining is:", value);
    });

    laundry.timeRemainingInSeconds.subscribe(function (value) {
        console.log("time remaining changed:", value);
    });
});
```

### *laundry.tankStatus*
The tank status is a read-only object with the following fields:
- tankType (the tank type, see [tank type](#tank-type))
- tankPercentageRemaining (an unsigned integer between 0 and 100, inclusive)

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.tankStatus.read(function (value) {
        console.log("tank status is:", value);
    });

    laundry.tankStatus.subscribe(function (value) {
        console.log("tank status changed:", value);
    });
});
```

### *laundry.tankSelected*
The tank selected is a read-only object with the following fields:
- tankType (the tank type, see [tank type](#tank-type))
- tankEnabled (zero for disabled, one for enabled)

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.tankSelected.read(function (value) {
        console.log("selected tank is:", value);
    });

    laundry.tankSelected.subscribe(function (value) {
        console.log("selected tank changed:", value);
    });
});
```

### *laundry.cycleSelected*
The cycle selected is a read-only integer value of the [cycle selected](#cycle-selected) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.cycleSelected.read(function (value) {
        console.log("selected cycle is:", value);
    });

    laundry.cycleSelected.subscribe(function (value) {
        console.log("selected cycle changed:", value);
    });
});
```

### *laundry.washerUserInterfaceServiceErrorCodes*
The washer user interface service error codes are a read-only integer representing the [washer user interface error codes](#washer-user-interface-error-codes) bit field.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.washerUserInterfaceServiceErrorCodes.read(function (value) {
        console.log("washer user interface error codes are:", value);
    });

    laundry.washerUserInterfaceServiceErrorCodes.subscribe(function (value) {
        console.log("washer user interface error codes changed:", value);
    });
});
```

### *laundry.washerInverterServiceErrorCodes*
The washer inverter service error codes are a read-only integer representing the [washer inverter error codes](#washer-inverter-error-codes) bit field.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.washerInverterServiceErrorCodes.read(function (value) {
        console.log("washer inverter service error codes are:", value);
    });

    laundry.washerInverterServiceErrorCodes.subscribe(function (value) {
        console.log("washer inverter service error codes changed:", value);
    });
});
```

### *laundry.washerMainControlServiceErrorCodes*
The washer main control service error codes are a read-only integer representing the [washer main control error codes](#washer-main-control-error-codes) bit field.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.washerMainControlServiceErrorCodes.read(function (value) {
        console.log("washer main control service error codes are:", value);
    });

    laundry.washerMainControlServiceErrorCodes.subscribe(function (value) {
        console.log("washer main control service error codes changed:", value);
    });
});
```

### *laundry.operatingMode*
The operating mode is a read-only integer value of the [operating mode](#operating-mode) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.operatingMode.read(function (value) {
        console.log("operating mode is:", value);
    });

    laundry.operatingMode.subscribe(function (value) {
        console.log("operating mode changed:", value);
    });
});
```

### *laundry.dryerCriticalResponseEnabled*
The operating mode is an integer value of the [critical response](#critical-response) enumeration.

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.dryerCriticalResponseEnabled.read(function (value) {
        console.log("dryer critical response enabled is:", value);
    });

    laundry.dryerCriticalResponseEnabled.subscribe(function (value) {
        console.log("dryer critical response enabled changed:", value);
    });

    laundry.dryerCriticalResponseEnabled.write(1);
});
```

### *laundry.delayTimeRemainingInMinutes*
The delay time remaining is a read-only integer representing the amount of time remaining for the delay (in minutes).

``` javascript
var greenBean = require("green-bean");

greenBean.connect("laundry", function(laundry) {
    laundry.delayTimeRemainingInMinutes.read(function (value) {
        console.log("delay time remaining is:", value);
    });

    laundry.delayTimeRemainingInMinutes.subscribe(function (value) {
        console.log("delay time remaining changed:", value);
    });
});
```

## Appendix

### Machine status
The following is a list of the available machine states and their enumerated value.

| Value   | Name                |
|:-------:|:--------------------|
| 0       | Idle                |
| 1       | Standby             |
| 2       | Run                 |
| 3       | Pause               |
| 4       | End of cycle        |
| 5       | DSM delay run       |
| 6       | Delay run           |
| 7       | Delay pause         |
| 8       | Drain timeout       |
| 128     | Clean speak         |

### Machine sub cycle
The following is a list of the available machine sub cycles and their enumerated value.

| Value   | Name                |
|:-------:|:--------------------|
| 0       | Not applicable      |
| 1       | Fill                |
| 2       | Soak                |
| 3       | Wash                |
| 4       | Rinse               |
| 5       | Spin                |
| 6       | Drain               |
| 7       | Extra spin          |
| 8       | Extra rinse         |
| 9       | Tumble              |
| 10      | Load size detection |
| 128     | Drying              |
| 129     | Mist steam          |
| 130     | Cool down           |
| 131     | Extended tumble     |
| 132     | Damp                |
| 133     | Air fluff           |

### End of cycle
The following is a list of the available end of cycle states and their enumerated value.

| Value   | Name                |
|:-------:|:--------------------|
| 0       | Not end of cycle    |
| 1       | End of cycle        |

### Dryer error codes
The following is a diagram of the value for each bit in the dryer error codes.
If the bit is set (value is 1) then that error is active.
If the bit is cleared (value is 0) then that error is not active.

| Bit     | Description                     |
|:-------:|:--------------------------------|
| 0       | Inlet short                     |
| 1       | Outlet short                    |
| 2       | Inlet open                      |
| 3       | Outlet open                     |
| 4       | EEPROM error                    |
| 5       | Stuck button                    |
| 6       | Door switch open                |
| 7       | Door brown out                  |
| 8       | Door drum motor                 |
| 9       | User interface flash CRC error  |
| 10      | User interface watchdog reset   |
| 11      | User interface assertion        |
| 12+     | Reserved                        |

### DSM overrides allowed
The following is a list of the available DSM override states and their enumerated value.

| Value   | Name                        |
|:-------:|:----------------------------|
| 0       | DSM override not allowed    |
| 1       | DSM override allowed        |

### Water temperature
The following is a list of the available water temperatures and their enumerated value.

| Value   | Name                            |
|:-------:|:--------------------------------|
| 0       | Specified by the cycle selected |
| 1       | Tap cold                        |
| 2       | Cold                            |
| 3       | Cool                            |
| 4       | Colors                          |
| 5       | Warm                            |
| 6       | Hot                             |
| 7       | Extra hot                       |

### Tank type
The following is a list of the available tank types and their enumerated value.

| Value   | Name                            |
|:-------:|:--------------------------------|
| 0       | Detergent                       |
| 1       | Softener                        |
| 2       | Bleach                          |
| 3       | Other                           |

### Cycle selected
The following is a list of the available cycle selected states and their enumerated value.

| Value   | Name                            |
|:-------:|:--------------------------------|
| 0       | Not defined                     |
| 1       | Basket clean                    |
| 2       | Drain and spin                  |
| 3       | Quick rinse                     |
| 4       | Bulky items                     |
| 5       | Sanitize                        |
| 6       | Towels or sheets                |
| 7       | Steam refresh                   |
| 8       | Normal or mixed load            |
| 9       | Whites                          |
| 10      | Dark colors                     |
| 11      | Jeans                           |
| 12      | Hand wash                       |
| 13      | Delicates                       |
| 14      | Speed wash                      |
| 15      | Heavy duty                      |
| 16      | Allergen                        |
| 17      | Power clean                     |
| 18      | Rinse and spin                  |
| 19      | Single item wash                |
| 128     | Cottons                         |
| 129     | Easy care                       |
| 130     | Active wear                     |
| 131     | Timed dry                       |
| 132     | Dewrinkle                       |
| 133     | Quick air fluff                 |
| 134     | Steam refresh                   |
| 135     | Steam dewrinkle                 |
| 136     | Speed dry                       |
| 137     | Mixed                           |
| 138     | Quick dry                       |
| 139     | Casuals                         |
| 140     | Warm up                         |

### Washer user interface error codes
The following is a diagram of the value for each bit in the washer user interface error codes.
If the bit is set (value is 1) then that error is active.
If the bit is cleared (value is 0) then that error is not active.

| Bit     | Description                     |
|:-------:|:--------------------------------|
| 0-7     | Reserved                        |
| 8       | Door lock                       |
| 9       | Door unlock                     |
| 10      | Flow meter                      |
| 11      | Recirculation pump              |
| 12-15   | Reserved                        |
| 16      | Slow level fill                 |
| 17      | Slow volume fill                |
| 18      | Drain system                    |
| 19      | Overflow                        |
| 20      | Inverter communication timeout  |
| 21      | Door open                       |
| 22      | Door unlocked in run            |
| 23      | Maximum volume error            |
| 24      | EEPROM                          |
| 25      | User interface flash CRC error  |
| 26      | User interface watchdog reset   |
| 27      | User interface assertion        |
| 28      | Brake timeout                   |
| 29      | Dispenser motor timeout         |
| 30      | Stuck button                    |
| 31      | Pressure switch                 |

### Washer inverter error codes
The following is a diagram of the value for each bit in the washer inverter error codes.
If the bit is set (value is 1) then that error is active.
If the bit is cleared (value is 0) then that error is not active.

| Bit     | Description                         |
|:-------:|:------------------------------------|
| 0       | CPU register failure                |
| 1       | ADC failure                         |
| 2       | Clock failure                       |
| 3       | Demo mode fault                     |
| 4       | Reset                               |
| 5       | Harness fault                       |
| 6       | Motor temperature watchdog          |
| 7       | Motor over temperature              |
| 8       | Door switch fault                   |
| 9       | Door lock fault                     |
| 10      | AC loss                             |
| 11      | VB2 brown out                       |
| 12      | Over speed                          |
| 13      | Software reset                      |
| 14      | ROM failure                         |
| 15      | RAM failure                         |
| 16      | Phase current critically high       |
| 17      | Locked rotor                        |
| 18      | Hall sensor fault                   |
| 19      | Communications fault                |
| 20      | Profiler fault                      |
| 21      | Watchdog timeout                    |
| 22      | Resource watchdog timeout           |
| 23      | Stack fault                         |
| 24      | Gate driver fault                   |
| 25      | VCC brown out                       |
| 26      | DCBUS brown out                     |
| 27      | DCBUS critically high               |
| 28      | IGBT temperature critically low     |
| 29      | IGBT temperature critically high    |
| 30      | GEA2 inverter action timeout        |
| 31      | Motor temperature critically high   |

### Washer main control error codes
The following is a diagram of the value for each bit in the washer main control error codes.
If the bit is set (value is 1) then that error is active.
If the bit is cleared (value is 0) then that error is not active.

| Bit     | Description                         |
|:-------:|:------------------------------------|
| 0-7     | Reserved                            |
| 8       | Door lock feedbacks                 |
| 9       | Bulk detergent pressure sensor      |
| 10      | Bulk softener pressure sensor       |
| 11-15   | Reserved                            |
| 16      | Volume slow fill                    |
| 17      | Drain system                        |
| 18      | Main control EEPROM                 |
| 19      | Target volume overflow              |
| 20      | Overflow                            |
| 21      | Inverter redundancy                 |
| 22      | Flow meter                          |
| 23      | Max errors                          |
| 24      | Door lock                           |
| 25      | Door unlock                         |
| 26      | Door open                           |
| 27      | Pressure switch                     |
| 28      | Dispenser motor                     |
| 29      | Thermal open                        |
| 30      | Thermal short                       |
| 31      | Level slow fill                     |

### Operating modes
The following is a list of the available operating modes and their enumerated value.

| Value   | Name                            |
|:-------:|:--------------------------------|
| 0       | Consumer mode                   |
| 1       | Service mode                    |
| 2       | Factory mode                    |
| 3       | Evaluation mode                 |
| 4       | Rapid delay mode                |
| 5       | Functional control test mode    |
| 6       | Model plug entry mode           |
| 7       | Demo mode                       |
| 8       | Consumer error mode             |
| 9       | Floor type selection mode       |

### Critical response
The following is a list of the available critical response states and their enumerated value.

| Value   | Name                            |
|:-------:|:--------------------------------|
| 0       | Critical response disabled      |
| 1       | Critical response enabled       |
