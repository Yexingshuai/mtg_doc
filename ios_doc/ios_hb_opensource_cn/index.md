
# HiBid开源框架iOS使用文档





## 概要

HiBid是一个聚合了多家支持head-bidding的主流平台的开源框架，可以支持快速、高效地实现多家平台head-bidding的功能。目前已经支持的Network有Facebook、Mintegral。<br/>
本文档描述iOS平台上如何集成并使用HiBid开源框架。



## 使用方法说明 



### 如何开始竞价（以Facebook为例）

1、初始化相应的HBBidNetworkItem对象 

```objective
NSMutableArray *items = [NSMutableArray new];
HBBidNetworkItem *item = [HBBidNetworkItem buildItemNetwork:(HBAdBidNetworkFacebook)
                                            customEventClassName:@"FBBidAdapter"
                                                           appId:@"your facebook appId"
                                                          unitId:@"your facebook placementId"];
    item.testMode = YES;//yes if you want to use test mode 
    item.platformId = ""your facebook platformId"";
    [items addObject:item];
```

2、调用HBAdsBidRequest的竞价请求方法

```objective

    NSString *unitId = @"Your own unitId";
    [HBAdsBidRequest getBidNetworks:items unitId:unitId adFormat:(HBAdBidFormatRewardedVideo) maxTimeoutMS:4000 responseCallback:^(HBAuctionResult *auctionResponse,NSError *error) { 
        if (error) {
            // to handle when error  
        }else{
            // success
            //auctionResponse.winner is the hightest price response   
        }
    }];

}
```


### 快速创建自定义的CustomAdapter(以创建Facebook的Adapter为例) 

1、创建HBBidBaseCustomEvent的子类 <br/>  
2、重载CustomAdapter里的所有方法<br/> 



示例代码如下：

FBBidAdapter.h

```objective
#import "HBBidBaseCustomEvent.h"

NS_ASSUME_NONNULL_BEGIN

@interface FBBidAdapter : HBBidBaseCustomEvent

@end

NS_ASSUME_NONNULL_END
```

FBBidAdapter.m

```objective

@implementation FBBidAdapter


-(void)getBidNetwork:(HBBidNetworkItem *)networkItem adFormat:(HBAdBidFormat)format responseCallback:(void (^)(HBAdBidResponse * _Nonnull))callback{

    __block FBAdBidFormat currentAdFormat;
    NSError *error = nil;
    [self convertWithHBAdBidFormat:format result:^(FBAdBidFormat fbFormat, NSError *error) {
        currentAdFormat = fbFormat;
    }];
    if (error) {
        HBAdBidResponse *response = [HBAdBidResponse buildResponseWithError:error];
        callback(response);
        return;
    }

    if (networkItem.testMode) {

        [FBAdBidRequest getAudienceNetworkTestBidForAppID:networkItem.appId
                                              placementID:networkItem.unitId
                                               platformID:networkItem.platformId
                                                 adFormat:currentAdFormat
                                             maxTimeoutMS:networkItem.maxTimeoutMS
                                         responseCallback:^(FBAdBidResponse * _Nonnull bidResponse) {
        
        HBAdBidResponse *response = [self buildAdBidResponse:bidResponse networkItem:networkItem];
        callback(response);
    }];
    }else{
        [FBAdBidRequest getAudienceNetworkBidForAppID:networkItem.appId
                                          placementID:networkItem.unitId
                                           platformID:networkItem.platformId
                                             adFormat:currentAdFormat
                                     responseCallback:^(FBAdBidResponse * _Nonnull bidResponse) {

            HBAdBidResponse *response = [self buildAdBidResponse:bidResponse networkItem:networkItem];
            callback(response);
        }];
    }
}

- (HBAdBidResponse *)buildAdBidResponse:(FBAdBidResponse *)bidResponse networkItem:(HBBidNetworkItem *)networkItem{
    HBAdBidResponse *response = nil;
    if (!bidResponse.isSuccess) {
        NSString *errorMsg = @"Current network still not support this adFormat";
        NSError *error = [HBAdBidError errorWithDomain:FBErrorDomain code:GDBidErrorNetworkBidFailed userInfo:@{NSLocalizedDescriptionKey : errorMsg}];
        response = [HBAdBidResponse buildResponseWithError:error];
        return response;
    }
    response = [HBAdBidResponse buildResponseWithPrice:bidResponse.getPrice currency:bidResponse.getCurrency payLoad:bidResponse.getPayload network:networkItem  adsRender:nil notifyWin:^{
        [bidResponse notifyWin];
    } notifyLoss:^{
        [bidResponse notifyLoss];
    }];
    return response;
}

- (void)convertWithHBAdBidFormat:(HBAdBidFormat)format result:(void(^)(FBAdBidFormat fbFormat,NSError *error))callback{
    
    FBAdBidFormat fbFormat;
    NSError *error = nil;
    switch (format) {
        case HBAdBidFormatNative:
            fbFormat = FBAdBidFormatNative;
            break;
        case HBAdBidFormatInterstitial:
            fbFormat = FBAdBidFormatInterstitial;
            break;
        case HBAdBidFormatRewardedVideo:
            fbFormat = FBAdBidFormatRewardedVideo;
            break;
        default:
        {
            NSString *errorMsg = @"Current network still not support this adFormat";
            error = [HBAdBidError errorWithDomain:FBErrorDomain code:GDBidErrorNetworkNotSupportCurrentAdFormat userInfo:@{NSLocalizedDescriptionKey : errorMsg}];

        }
            break;
    }

    callback(fbFormat,error);
}

@end
```



##FAQ

1.**开源项目目前支持哪几种广告形式？**<br/>
开源项目目前仅支持广告类型： NATIVE， INTERSTITIAL，REWARDED_VIDEO。但支持开发者自定义其他广告类型。<br/>
2.**竞价返回的价格是什么货币单位？**<br/>
竞价返回的价格必须是以美元计价的，开发者在自定义adapter的时候，确保其竞价价格单位是美元，不建议使用其他币种和自定义汇率转换。<br/> 
3.**出价相同的bidder如何排序？**<br/>
出价格相等的Network，先返回者排在最前面,默认排在前面的即为本次竞价的winner。<br/>
4.**若返回的竞价都是0代表什么**？<br/> 
若所有Network返回的价格都是0，默认本次竞价没有winner。 <br/> 
5.**如果一家bidder竞价fail了，那么最终返回的是success还是fail?**<br/> 
我们设置了10S请求超时，如果10s内，有一家Network返回成功，则返回成功，其他家Network请求失败

##Changelog
版本号 | ChangeLog | 发布时间
------|-----------|------
1.0.0 | HiBid开源框架发布| 2019.05.13 

