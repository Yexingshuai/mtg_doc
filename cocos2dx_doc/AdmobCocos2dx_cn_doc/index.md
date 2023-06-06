
# Admob Cocos2d-x Adapter 开发文档
  
##1 概述
本文档描述了Cocos2d-x开发者如何集成Mintegral Admob Cocos2d-x Adapter 产品。  
Cocos2d-x Adapter 将提供了多种广告形式：RewardVideo（激励性视频）、InterstitialVideo（插屏视频）、Interstitial（插屏）。 

###1.1 提供文件
**/Adapter/所有文件/**  
**mintegral_admob.jar**  

###1.2 集成注意

建立好Cocos2d-x工程后，把上面提供的Bridege文件夹拷贝到你的项目中指定位置，编译Android和iOS项目，就可以了。   

**/你的项目/proj.ios_mac/frameworks/Adapter/**  
**/你的项目/proj.android-studio/app/src/Mintegral/** 

##2 集成准备
###2.1 申请账号
开发者从Mintegral运营人员处获取账号、密码后，登录[M系统后台](http://mmonetization.com/user/login)
###2.2 App Key
开发者每个账号都有对应的AppKey，请求广告时需要用到该参数，它可以从M系统后台获取。  
登录M系统后台，在AD Unit -> App界面，可以查看到该账号的AppKey，如图所示：  
 ![](./apikey.png)  
###2.3 App Id
开发者每创建一个应用后，系统会自动生成AppId，可在AD Unit -> App界面查看到已创建的应用以及对应的AppId，如图所示：  
![](./appid.png)
###2.4 Unit Id
开发者每创建一个广告位后，系统会自动生成UnitId，可在AD Unit -> AD Unit界面查看到已创建的广告位以及对应的UnitId，如图所示：         
![](./unitid.png)     

## 3 Cocos2d-x Bridge 开发环境的配置
### 3.1 开发需求 

cocos2d-x-3.16  
Android Studio  
Xcode 
 
	
### 3.2 配置
1，配置NDK：Android 原生的Native的SDK  
   下载地址：https://developer.android.com/ndk/downloads/index.html    
   建议配置地址：/Users/你的电脑/Library/Android/sdk/ndk-bundle/android-ndk-r14b/

2，配置ANDROID_SDK_ROOT：标准的Android SDK    
   下载地址：无，直接在用户的资源库中查找    
   地址：/Users/你的电脑/Library/Android/sdk/    

3，配置ANT_ROOT：多渠道发行打包工具     
   下载地址：http://ant.apache.org/bindownload.cgi    
   建议配置地址：  /Users/你的电脑/Library/Android/sdk/apache-ant-1.10.1/bin/ 
   

## 4 配置开发环境

### 4.1 Admob集成
A、在Cocos2dx环境中集成Adomb环境，按着[Firebase指导](https://firebase.google.com/docs/admob/cpp/cocos2d-x)进行,里面也包含部分示例可供参考;    

B、参考文档: 将[Firebase集成到Android](https://firebase.google.com/docs/android/setup)开发环境;  

C、参考文档: [设置Firebase项目](https://console.firebase.google.com/);

### 4.2 iOS
 A、添加MTGSDK的framework到项目工程Add Files to ...，按着 [iOS开发者文档](http://cdn-adn.rayjump.com/cdn-adn/v2/markdown_v2/index.html?file=sdk-m_sdk-ios&lang=en) 添加系统库的framework；    
 
B、在工程的Build Settings中，找到Other Linker Flags，增加一个flag：-ObjC，注意大小写。   

C、就是添加两个Frameworks：GameController.framework和MediaPlayer.framework。达到连接器的工作原理


### 4.3 Android
A、添加MTGSDK到项目工程，按着 [Android开发者文档](http://cdn-adn.rayjump.com/cdn-adn/v2/markdown_v2/index.html?file=sdk-m_sdk-android&lang=cn) 把jar包和res文件添加到Android工程;    
    
B、修改 你的项目/proj.android-studio/app/jni/Android.mk  文件，添加Classes文件夹需要的工程文件;     
    ![](./cocos_mk.png =560x350)     
    
C、然后修改AndroidManifest文件，把各种权限添加上;    
            

**打开 AndroidManifest.xml，配置以下内容：**

**必要权限**

```actionScript
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

**非必要权限**

```actionScript
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```


## 5 Admob正常版本配置
（所做的修改大概一个小时后才生效） 

 1、访问 https://apps.admob.com/#home</br>
 2、点击 '获利'</br>
 3、点击 创建新的App</br>
 4、创建您的广告位</br>
 5、点击您创建的App</br>
 6、配置广告源</br>     
 
  ![](./1.png =560x350)     
 6.1、点击 创建一个新的Network</br>
 6.2、点击 创建一个Custom Event         
 
  ![](./2.png =560x350)         
  
## 6 admob Beta版本配置
1、进入https://apps.admob.com/#home     2、添加应用并创建广告位，添加应用位置如下图：     
![](./add_application.png =560x350)      3、广告位配置:        

3.1 回到首页点击中介，创建中介组。        

3.2 配置中介组。选择广告格式和平台及其他配置。       ![](./create_mediation.png =560x350)        3.3 添加广告单元，选择要配置的广告单元。            ![](./select_ads_unit.png =560x350)         3.4 选择广告来源，添加自定义事件。          ![](./add_custom_event.png =560x350)        3.5 配置参数（参考如何配置Class Name和parameter）          ![](./setting_ads_unit.png =560x350)          

##7 欧盟GDPR版本须知    
    
**注意**     
1、Android仅针对SDK v_8.11.0版本及以上版本，对应adapter 版本为V_1.2.0。       
2、iOS仅针对SDK v_3.8.0 版本及以上版本，对应adapter 版本为V_1.2.0。             
3、如果不上报用户信息，将会影响广告投放，可能会引起没有广告返回的情况，请知悉。              
4、对于欧盟用户，开发者集成时，建议在征得用户同意之前，先不要初始化SDK，以免引起不必要的麻烦。                

**Android参数信息**
   
```objectivec
authority_all_info//总开关(控制以下全部参数)    
authority_general_data               
authority_device_id               
authority_gps 
authority_imei_mac
authority_android_id
authority_applist
authority_app_download
authority_app_progress       
         
```

**iOS参数信息**
   
```objectivec
authority_all_info//总开关(控制以下全部参数)    
authority_general_data               
authority_device_id               
authority_gps       
         
```


**配置Parameters（以Android为例）**     
SDK v_8.11.0及以上版本的各广告类型在admob后台都需要添加上述参数，例：
    
```objectivec        
{
	"appId":"xxxx",
	"appKey":"xxxx",
	"unitId":"xxxx",         
	"authority_all_info":"1",
	"authority_general_data":"1",
	"authority_device_id":"1",
	"authority_gps":"1",      
	"authority_imei_mac":"1",           
	"authority_android_id":"1",      
	"authority_applist":"1",       
	"authority_app_download":"1",         
	"authority_app_progress":"1"      
	
}       

```
1为允许，0为禁止。

 

## 8 如何配置Class Name和parameter：

###<a name="RewardVideoJump">RewardVideo 广告类型</a>
  
**1、 iOS 版本**

填写 'Class Name': **MintegralCustomEventRewardedVideo**
填写 'parameter' , 示例：

```objectivec
{
	"appId": "xxxx",
	"appKey": "xxxx",
	"unitId": "xxxx",
	"rewardId": "1"
}
```

**2、 Android 版本**

填写 'Class Name': **com.mintegral.msdk.adapter.admob.MTGToAdmobRewardVideoAdapter**
填写 'parameter' , 示例：

```objectivec
{
	"appId": "xxxx",
	"appKey": "xxxx",
	"unitId": "xxxx",
	"rewardId": "1"
}
```


****  

###<a name="InterstitialVideoJump">InterstitialVideo 广告类型</a>
  
**1、 iOS 版本**

填写 'Class Name': **MintegralCustomEventInterstitialVideo**
填写 'parameter' , 示例：

```objectivec
{
	"appId": "xxxx",
	"appKey": "xxxx",
	"unitId": "xxxx"
}
```

**2、 Android 版本**

填写 'Class Name': **com.mintegral.msdk.adapter.admob.MintegralCustomEventInterstitialVideoNative**
填写 'parameter' , 示例：

```objectivec
{
	"appId": "xxxx",
	"appKey": "xxxx",
	"unitId": "xxxx"
}
```


****  

###<a name="InterstitialJump">Interstitial 广告类型</a>
  
**1、 iOS 版本**

填写 'Class Name': **MintegralCustomEventInterstitial**
填写 'parameter' , 示例：

```objectivec
{
	"appId": "xxxx",
	"appKey": "xxxx",
	"unitId": "xxxx"
}
```

**2、 Android 版本**

填写 'Class Name': **com.mintegral.msdk.adapter.admob.MintegralCustomEventInterstitial**
填写 'parameter' , 示例：

```objectivec
{
	"appId": "xxxx",
	"appKey": "xxxx",
	"unitId": "xxxx"
}
```


****  


 **Note**

1、为了方便展示我们的广告，建议您关闭AdMob的优化，降低AdMob的eCPM
 

## 9 ChangeLog 

版本号   | changeLog | 发布时间
------|-----------|------
1.3.0|替换Mintegral包名 | 2018.07.27
1.2.0 | 基于Android 8.11.2和iOS 3.8.0,支持GDPR功能；|2018.05.22
1.1.0 | 实现激励性视频(RewardVideo)、插屏视频(InterstitialVideo)、插屏(Interstitial)广告平台的接入功能。| 2018.03.30
