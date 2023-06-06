#iOS MTGSDK OpenSource Guide

The document will introduce how to integrate MTGSDK via open source code. For Ads ID creation and integration API, please see [MTG SDK Integration Document](http://cdn-adn.rayjump.com/cdn-adn/v2/markdown_v2/index.html? file=sdk-m_sdk-ios&lang=cn) learn more.

Please take the following steps :     
1. Manually copy the SDK file to your project     
2. Import basic static libraries        
3. Xcode's parameter configuration

###Import SDK

Find the MTGSDK.zip file in the files provided by AM.
Unzip the file and import it all into your project. **We recommended that copy it to your project root directory.** Select Create groups to complete the import. 
  
![](./addsdk.png)

### Import basic static libraries        

CoreGraphics.framework <br/>
Foundation.framework<br/>
UIKit.framework<br/>
libsqlite3.tbd  (It's libsqlite3.dylib below Xcode7)<br/>
libz.tbd  (It'slibz.dylib below Xcode7)<br/>
AdSupport.framework<br/>
StoreKit.framework<br/>
QuartzCore.framework<br/>
CoreTelephony.framework<br/>
MobileCoreServices.framework<br/>
AVFoundation.framework<br/>
WebKit.framework<br/>

### Parameter Configuration

**1. Add linker parameter for XCode**        
Find Other Linker Flags in build settings and add flag: -ObjC (case sensitive).

**2. Allow the operation of the HTTP connection**
Due to the App Transport Security regulations of iOS 9, you need to modify the project's info.plist file, allowing HTTP connection. The specific method is below:
Add an App Transport Security Settings Dictionary in the info.plist file; and add an Allow Arbitrary Loads key with its boolean value (setting as "YES") for this Dictionary.

**3. Add Prefix Header**      
Search 'prefix header' in the project's Build Settings.   
Add `$(PROJECT_DIR)/$(TARGET_NAME)/MTGSDK/PrefixHeader.pch`      
Refer to the picture below：     

![](./prefixheader.png)


