#开源 MTGSDK 集成指南
本文档将介绍如何接入MTGSDK开源代码，广告ID创建及集API请参考[MTG SDK集成文档](http://cdn-adn.rayjump.com/cdn-adn/v2/markdown_v2/index.html?file=sdk-m_sdk-ios&lang=cn)。      

请按以下步骤正确接入开源 MTGSDK：            
1、手动将 SDK 文件拷贝到您的项目中               
2、导入基本静态库      
3、完成参数配置             


###导入SDK

在AM提供的文件中找到 MTGSDK.zip文件。
解压该文件，并将其全部到导入到您的项目中。**建议将其拷贝到项目根目录下,**选择 Create groups -- Finish 导入完成。     
  

![](./addsdk.png)
### 导入静态库

CoreGraphics.framework <br/>
Foundation.framework<br/>
UIKit.framework<br/>
libsqlite3.tbd (在Xccode7以下是libsqlite3.dylib)<br/>
libz.tbd (在Xcode7以下是libz.dylib)<br/>
AdSupport.framework<br/>
StoreKit.framework<br/>
QuartzCore.framework<br/>
CoreTelephony.framework<br/>
MobileCoreServices.framework<br/>
AVFoundation.framework<br/>
WebKit.framework<br/>

### 参数配置
**1、增加XCode的链接器参数**           

在工程的Build Settings中，找到Other Linker Flags，增加一个flag：-ObjC，注意大小写。

**2、允许http连接的操作**         

由于iOS9的App Transport Security，还需要修改工程的info.plist文件，使其允许http连接。方法如下：            
在info.plist文件里增加一个App Transport Security Settings的Dictionary，并给这个Dictionary添加一个key为Allow Arbitrary Loads的布尔值，设置为YES。

**3、添加Prefix Header**      
在工程的Build Settings中直接搜索 prefix header.     
添加`$(PROJECT_DIR)/$(TARGET_NAME)/MTGSDK/PrefixHeader.pch` 

![](./prefixheader.png)


