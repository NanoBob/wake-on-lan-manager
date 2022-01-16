# wake-on-lan-manager
This project serves as a simple tool to send wake-on-lan packets to devices on your local network.

It contains the following functionality:
- Create and view registered devices
- Current state of the device (on/off)
- Send wake on lan packet
- Password protection

# Setup
The project requires set-up across multiple different devices, the server, and all the clients.  

**Server**
- Has to be a linux system (I use a Raspberry pi)
- Install dotnet core 6.0
- Install `wakeonlan`
- Run the API project using `dotnet`

**Clients**
- Has to use an ethernet connection, no wifi
- Has to have wake on lan enabled in BIOS 
  - (some motherboard manufacturers have this enabled by default, consult your manual)
- Has to have wake on lan enabled in Windows adapter options for your ethernet adapter. 
  - Settings -> Network & Internet > Change adapter options
  - Right click your ethernet adapter > Properties
  - Configure
  - Advanced Tab
    - Enable "Wake on magic packet" and "Wake on pattern match"
  - Power management tab
    - Enable "Allow this device to wake the computer" and "Only allow a magic packet to wake the computer"
- Has to change firewall rules to allow pinging
   - `netsh advfirewall firewall add rule name="ICMP Allow incoming V4 echo request" protocol=icmpv4:8,any dir=in action=allow`
   - `netsh advfirewall firewall add rule name="ICMP Allow incoming V6 echo request" protocol=icmpv6:8,any dir=in action=allow`

