/*
 * Copyright (c) 2014 General Electric
 *  
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 * 
 */

const LAUNDRY_BASE = 0x2000;

function Laundry (bus, appliance, base) {
    appliance.machineStatus = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.machineSubCycle = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.endOfCycle = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.cycleCount = appliance.erd({
        erd: base++,
        endian: "big",
        format: "UInt16"
    });
    
    appliance.dryerServiceErrorCodes = appliance.erd({
        erd: base++,
        endian: "big",
        format: "UInt32"
    });
    
    appliance.dsmOverridesAllowed = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.maximumWaterTemperature = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.timeRemainingInSeconds = appliance.erd({
        erd: base++,
        endian: "big",
        format: "UInt16"
    });
 
    appliance.tankStatus = appliance.erd({
        erd: base++,
        format: [
            "tankType:UInt8",
            "tankPercentageRemaining:UInt8"
        ]
    });
    
    appliance.tankSelected = appliance.erd({
        erd: base++,
        format: [
            "tankType:UInt8",
            "tankEnabled:UInt8"
        ]
    });
    
    appliance.cycleSelected = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.washerUserInterfaceServiceErrorCodes = appliance.erd({
        erd: base++,
        endian: "big",
        format: "UInt32"
    });
    
    appliance.washerInverterServiceErrorCodes = appliance.erd({
        erd: base++,
        endian: "big",
        format: "UInt32"
    });
    
    appliance.washerMainControlServiceErrorCodes = appliance.erd({
        erd: base++,
        endian: "big",
        format: "UInt32"
    });
    
    appliance.operatingMode = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.dryerCriticalResponseEnabled = appliance.erd({
        erd: base++,
        format: "UInt8"
    });
    
    appliance.delayTimeRemainingInMinutes = appliance.erd({
        erd: base++,
        endian: "big",
        format: "UInt16"
    });
    
    return appliance;
}

exports.plugin = function (bus, configuration, callback) {
    bus.on("appliance", function (appliance) {
        appliance.read(LAUNDRY_BASE, function (value) {
            bus.emit("laundry", Laundry(bus, appliance, LAUNDRY_BASE));
        });
    });
    
    var create = bus.create;
    
    bus.create = function (name, callback) {
        create(name, function (appliance) {
            if (name == "laundry") {
                appliance.address = configuration.address;
                appliance.version = configuration.version;
                Laundry(bus, appliance, LAUNDRY_BASE);
            }
            
            callback(appliance);
        });
    };
    
    callback(bus);
};
