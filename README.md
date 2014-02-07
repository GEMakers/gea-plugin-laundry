# Laundry Plugin for the GEA SDK

This node.js package provides functionality for communicating with a clothes washer and clothes dryer via the [GEA SDK](https://github.com/GEMakers/gea-sdk).

## Table of Contents

- [Installation](#installation)
- [API](#laundry-api)
  - [bus.on("laundry", callback)](#busonlaundry-callback)
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
- [Appendix](#appendix)
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

## Installation
To install this application using the node.js package manager, issue the following commands:

```
npm install git+https://github.com/GEMakers/gea-plugin-laundry.git
```

To include the plugin in your application, use the *plugin* function after configuring your application.

``` javascript
var gea = require("gea-sdk");
var adapter = require("gea-adapter-usb");

// configure your application
var app = gea.configure({
    address: 0xcb
});

// include the laundry plugin in your application
app.plugin(require("gea-plugin-laundry"));

// bind to the adapter to access the bus
app.bind(adapter, function (bus) {
    // the bus now has all of the laundry plugin functions
});
```

## Laundry API
Below is the documentation for each of the functions provided by this plugin, as well as a few examples showing how to use them.

### *bus.on("laundry", callback)*
This event is emitted whenever a laundry has been discovered on the bus.
A laundry object is passed from the plugin to the function.
This laundry object inherits all functions and properties from the appliance object.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        console.log("address:", laundry.address);
        console.log("version:", laundry.version.join("."));
    });
});
```

### *laundry.machineStatus*
The machine status is a read-only integer value of the [machine status](#machine-status) enumeration.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.machineStatus.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.machineStatus.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *laundry.machineSubCycle*
The machine sub cycle is a read-only integer value of the [machine sub cycle](#machine-sub-cycle) enumeration.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.machineSubCycle.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.machineSubCycle.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *laundry.endOfCycle*
The end of cycle is a read-only integer value of the [end of cycle](#end-of-cycle) enumeration.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.endOfCycle.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.endOfCycle.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *laundry.cycleCount*
The cycle count is a read-only unsigned integer representing a running total of the number of cycles that have been run.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.cycleCount.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.cycleCount.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *laundry.dryerServiceErrorCodes*
The dryer service error codes are a read-only integer representing the [dryer error codes](#dryer-error-codes) bit field.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.dryerServiceErrorCodes.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.dryerServiceErrorCodes.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *laundry.dsmOverridesAllowed*
The DSM overrides allowed is an integer value of the [DSM overrides allowed](#dsm-overrides-allowed) enumeration.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.dsmOverridesAllowed.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.dsmOverridesAllowed.subscribe(function (value) {
            console.log("subscribe:", value);
        });
        
        laundry.dsmOverridesAllowed.write(1);
    });
});
```

### *laundry.maximumWaterTemperature*
The maximum water temperature is an integer value of the [water temperature](#water-temperature) enumeration.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.maximumWaterTemperature.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.maximumWaterTemperature.subscribe(function (value) {
            console.log("subscribe:", value);
        });
        
        laundry.maximumWaterTemperature.write(6);
    });
});
```

### *laundry.timeRemainingInSeconds*
The time remaining is a read-only integer representing the amount of time remaining in the current cycle (in seconds).

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.timeRemainingInSeconds.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.timeRemainingInSeconds.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *laundry.tankStatus*
The tank status is a read-only object with the following fields:
- tankType (the tank type, see [tank type](#tank-type))
- tankPercentageRemaining (an unsigned integer between 0 and 100, inclusive)

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.tankStatus.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.tankStatus.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *laundry.tankSelected*
The tank selected is a read-only object with the following fields:
- tankType (the tank type, see [tank type](#tank-type))
- tankEnabled (zero for disabled, one for enabled)

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.tankSelected.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.tankSelected.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *laundry.cycleSelected*
The cycle selected is a read-only integer value of the [cycle selected](#cycle-selected) enumeration.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.cycleSelected.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.cycleSelected.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *laundry.washerUserInterfaceServiceErrorCodes*
The washer user interface service error codes are a read-only integer representing the [washer user interface error codes](#washer-user-interface-error-codes) bit field.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.washerUserInterfaceServiceErrorCodes.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.washerUserInterfaceServiceErrorCodes.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *laundry.washerInverterServiceErrorCodes*
The washer inverter service error codes are a read-only integer representing the [washer inverter error codes](#washer-inverter-error-codes) bit field.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.washerInverterServiceErrorCodes.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.washerInverterServiceErrorCodes.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *laundry.washerMainControlServiceErrorCodes*
The washer main control service error codes are a read-only integer representing the [washer main control error codes](#washer-main-control-error-codes) bit field.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.washerMainControlServiceErrorCodes.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.washerMainControlServiceErrorCodes.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *laundry.operatingMode*
The operating mode is a read-only integer value of the [operating mode](#operating-mode) enumeration.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.operatingMode.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.operatingMode.subscribe(function (value) {
            console.log("subscribe:", value);
        });
    });
});
```

### *laundry.dryerCriticalResponseEnabled*
The operating mode is an integer value of the [critical response](#critical-response) enumeration.

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.dryerCriticalResponseEnabled.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.dryerCriticalResponseEnabled.subscribe(function (value) {
            console.log("subscribe:", value);
        });
        
        laundry.dryerCriticalResponseEnabled.write(1);
    });
});
```

### *laundry.delayTimeRemainingInMinutes*
The delay time remaining is a read-only integer representing the amount of time remaining for the delay (in minutes).

``` javascript
app.bind(adapter, function (bus) {
    bus.on("laundry", function (laundry) {
        laundry.delayTimeRemainingInMinutes.read(function (value) {
            console.log("read:", value);
        });
        
        laundry.delayTimeRemainingInMinutes.subscribe(function (value) {
            console.log("subscribe:", value);
        });
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
