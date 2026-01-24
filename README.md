# ^..^ CAT Calendar HarmonyOS

![CAT Calendar Logo](src/Common/logo.png)

CAT Calendar is a calendar application for Huawei HarmonyOS, built using the QuickAPP IDE.

## Features

- **Calendar Interface:** A calendar interface with monthly and daily views.
- **Sunrise and Sunset Times:** Displays  sunrise and sunset times based on the user's location.
- **Moon Phases:** Automatically calculates and displays the current moon phase with corresponding emojis.
- **Dynamic Date Display:** The app shows the current date, month, and day of the week.
- **Huawei HarmonyOS Integration:** The app is specifically designed to run on Huawei HarmonyOS devices, utilizing the capabilities of the QuickAPP IDE.

## Installation

### Prerequisites

- **Huawei QuickApp IDE** - Download from the [official Huawei Developer website](https://developer.huawei.com/consumer/en/quickApp-ide/)
- **Huawei device** with USB debugging enabled
- **Node.js** (for building from source)

### Download QuickApp IDE

1. Visit the [Huawei QuickApp IDE download page](https://developer.huawei.com/consumer/en/doc/Tools-Library/quickapp-ide-download-0000001101172926)
2. Download the appropriate version for your operating system (Windows/macOS)

### Linux (Arch)

The Huawei QuickApp IDE is not natively available for Linux. Use one of these workarounds:

**Option 1: Run Windows version via Wine**
```bash
# Install wine
sudo pacman -S wine

# Download the Windows .exe installer from the Huawei Developer website
# Run the installer
wine QuickAppIde-Setup-x.x.x.exe
```

**Option 2: Use a Windows VM**
```bash
# Install VirtualBox or QEMU
sudo pacman -S virtualbox
# or
sudo pacman -S qemu-full

# Set up a Windows VM and install QuickApp IDE natively
```

**Option 3: Use the pre-built .rpk directly**

Transfer the pre-built `dist/cat.calendar.rpk` to your Huawei device using ADB:
```bash
# Install android-tools for ADB
sudo pacman -S android-tools

# Enable USB debugging on your Huawei device
# Connect device via USB

# Push the rpk file
adb push dist/cat.calendar.rpk /sdcard/Download/

# Install using Huawei Quick App Loader (install from AppGallery on device)
```

### macOS

1. **Download the IDE**
   - Visit [Huawei QuickApp IDE](https://developer.huawei.com/consumer/en/quickApp-ide/)
   - Download the macOS version (.dmg file)

2. **Install the IDE**
   ```bash
   # Open the downloaded .dmg file
   open ~/Downloads/QuickAppIde-x.x.x.dmg

   # Drag QuickApp IDE to Applications folder
   ```

3. **First launch (bypass Gatekeeper if needed)**
   ```bash
   # If macOS blocks the app, run:
   xattr -cr /Applications/QuickApp\ IDE.app
   ```

4. **Connect your Huawei device**
   - Enable USB debugging on your Huawei device:
     - Go to Settings > About phone > Tap "Build number" 7 times
     - Go to Settings > Developer options > Enable USB debugging
   - Connect device via USB cable

5. **Open and deploy the project**
   - Launch QuickApp IDE
   - Open this project folder
   - Click "Run" to build and deploy to connected device

### Building from Source

```bash
# Clone the repository
git clone https://github.com/glebone/cat.calendar.git
cd cat.calendar

# Install dependencies (if package.json exists)
npm install

# Open in QuickApp IDE and use the built-in build function
# Or use the IDE's command line tools:
# Build -> produces dist/cat.calendar.rpk
```

### Deploy to Device

1. Connect your Huawei device via USB (with USB debugging enabled)
2. Open the project in QuickApp IDE
3. Click the "Run" button to build and deploy
4. The app will launch automatically on your device

