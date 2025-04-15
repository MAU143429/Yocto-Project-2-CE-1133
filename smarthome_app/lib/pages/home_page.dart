import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:smarthome_app/util/smart_device_box.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // padding constants
  final double horizontalPadding = 40;
  final double verticalPadding = 25;

  // list of smart devices
  List mySmartDevices = [
    ["Kitchen Light", "lib/icons/light-bulb.png", true],
    ["Living Room Light", "lib/icons/light-bulb.png", false],
    ["Bathroom Light", "lib/icons/light-bulb.png", false],
    ["Bedroom 1 Light", "lib/icons/light-bulb.png", false],
    ["Bedroom 2 Light", "lib/icons/light-bulb.png", true],
    ["Main Door", "lib/icons/door.png", false],
    ["Bathroom Door", "lib/icons/door.png", false],
    ["Bedroom 1 Door", "lib/icons/door.png", false],
    ["Bedroom 2 Door", "lib/icons/door.png", false],
  ];

  // power button switched
  void powerSwitchChanged(bool value, int index) {
    setState(() {
      mySmartDevices[index][2] = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.only(bottom: 20), // para evitar otro posible overflow
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // app bar
                Padding(
                  padding: EdgeInsets.symmetric(
                    horizontal: horizontalPadding,
                    vertical: verticalPadding,
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // menu icon
                      Image.asset(
                        'lib/icons/menu.png',
                        height: 45,
                        color: Colors.grey[800],
                      ),

                      // account icon
                      Icon(
                        Icons.person,
                        size: 45,
                        color: Colors.grey[800],
                      )
                    ],
                  ),
                ),

                const SizedBox(height: 20),

                // welcome home
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Welcome Home,",
                        style: TextStyle(fontSize: 20, color: Colors.grey.shade800),
                      ),
                      Text(
                        'Mauricio Calderon',
                        style: GoogleFonts.bebasNeue(fontSize: 72),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 25),

                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 40.0),
                  child: Divider(
                    thickness: 1,
                    color: Color.fromARGB(255, 204, 204, 204),
                  ),
                ),

                const SizedBox(height: 25),

                // smart devices label
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: horizontalPadding),
                  child: Text(
                    "Smart Devices",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 24,
                      color: Colors.grey.shade800,
                    ),
                  ),
                ),

                const SizedBox(height: 10),

                // smart devices grid
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 25),
                  child: GridView.builder(
                    itemCount: mySmartDevices.length,
                    shrinkWrap: true,
                    physics: NeverScrollableScrollPhysics(),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 1 / 1.3,
                    ),
                    itemBuilder: (context, index) {
                      return SmartDeviceBox(
                        smartDeviceName: mySmartDevices[index][0],
                        iconPath: mySmartDevices[index][1],
                        powerOn: mySmartDevices[index][2],
                        onChanged: (value) => powerSwitchChanged(value, index),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
