"use strict";(self.webpackChunkgeoblocs=self.webpackChunkgeoblocs||[]).push([[4263],{4263:function(e,t,n){n.r(t),n.d(t,{FrameConnector:function(){return k}});var r=n(29439),s=n(74165),i=n(15861),c=n(1413),a=n(15671),o=n(43144),u=n(97326),h=n(60136),d=n(29388),p=n(2600),v=n(97419),f=n(60723),l=n(49716),m=n(69822),w=n(38690),g=n(83506),x=n(91609),k=(n(65892),function(e){(0,h.Z)(m,e);var t=(0,d.Z)(m);function m(e){var n;(0,a.Z)(this,m);var r=e.chains,s=e.options,i=e.connectorStorage,o=(0,c.Z)({shimDisconnect:!0},s);return n=t.call(this,{chains:r,options:o}),(0,p._)((0,u.Z)(n),"id","frame"),(0,p._)((0,u.Z)(n),"name","Frame"),(0,p._)((0,u.Z)(n),"ready",!0),(0,p._)((0,u.Z)(n),"shimDisconnectKey","".concat(n.id,".shimDisconnect")),(0,p._)((0,u.Z)(n),"onAccountsChanged",(function(e){0===e.length?n.emit("disconnect"):n.emit("change",{account:v.getAddress(e[0])})})),(0,p._)((0,u.Z)(n),"onChainChanged",(function(e){var t=(0,x.n)(e),r=n.isChainUnsupported(t);n.emit("change",{chain:{id:t,unsupported:r}})})),(0,p._)((0,u.Z)(n),"onDisconnect",(function(){n.emit("disconnect"),n.options.shimDisconnect&&n.connectorStorage.removeItem(n.shimDisconnectKey)})),n.connectorStorage=i,n}return(0,o.Z)(m,[{key:"connect",value:function(){var e=(0,i.Z)((0,s.Z)().mark((function e(t){var n,r,i,c,a,o;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.getProvider();case 3:if(n=e.sent){e.next=6;break}throw new w.a;case 6:return this.setupListeners(),this.emit("message",{type:"connecting"}),e.next=10,n.request({method:"eth_requestAccounts"});case 10:return r=e.sent,i=v.getAddress(r[0]),e.next=14,this.getChainId();case 14:if(c=e.sent,a=this.isChainUnsupported(c),null===t||void 0===t||!t.chainId||c===(null===t||void 0===t?void 0:t.chainId)){e.next=22;break}return e.next=19,this.switchChain(null===t||void 0===t?void 0:t.chainId);case 19:o=e.sent,c=o.chainId,a=this.isChainUnsupported(c);case 22:return this.options.shimDisconnect&&this.connectorStorage.setItem(this.shimDisconnectKey,"true"),e.abrupt("return",{account:i,provider:n,chain:{id:c,unsupported:a}});case 26:if(e.prev=26,e.t0=e.catch(0),!this.isUserRejectedRequestError(e.t0)){e.next=30;break}throw new w.U(e.t0);case 30:if(-32002!==e.t0.code){e.next=32;break}throw new w.R(e.t0);case 32:throw e.t0;case 33:case"end":return e.stop()}}),e,this,[[0,26]])})));return function(t){return e.apply(this,arguments)}}()},{key:"disconnect",value:function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getProvider();case 2:if(null!==(t=e.sent)&&void 0!==t&&t.removeListener){e.next=5;break}return e.abrupt("return");case 5:t.removeListener("accountsChanged",this.onAccountsChanged),t.removeListener("chainChanged",this.onChainChanged),t.removeListener("disconnect",this.onDisconnect),this.isInjected()||t.close(),this.options.shimDisconnect&&this.connectorStorage.removeItem(this.shimDisconnectKey);case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getAccount",value:function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var t,n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getProvider();case 2:if(t=e.sent){e.next=5;break}throw new w.a;case 5:return e.next=7,t.request({method:"eth_accounts"});case 7:return n=e.sent,e.abrupt("return",v.getAddress(n[0]));case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getChainId",value:function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var t,n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getProvider();case 2:if(t=e.sent){e.next=5;break}throw new w.a;case 5:return e.next=7,t.request({method:"eth_chainId"});case 7:return n=e.sent,e.abrupt("return",(0,x.n)(n));case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getProvider",value:function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.isInjected()){e.next=4;break}e.t0=this.injectedProvider(),e.next=7;break;case 4:return e.next=6,this.createProvider();case 6:e.t0=e.sent;case 7:return this._provider=e.t0,e.abrupt("return",this._provider);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getSigner",value:function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var t,n,i,c,a,o=arguments;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(o.length>0&&void 0!==o[0]?o[0]:{}).chainId,e.next=3,Promise.all([this.getProvider(),this.getAccount()]);case 3:return n=e.sent,i=(0,r.Z)(n,2),c=i[0],a=i[1],e.abrupt("return",new f.Q(c,t).getSigner(a));case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"isAuthorized",value:function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!this.options.shimDisconnect||this.connectorStorage.getItem(this.shimDisconnectKey)){e.next=3;break}return e.abrupt("return",!1);case 3:return e.next=5,this.getProvider();case 5:if(e.sent){e.next=8;break}throw new w.a;case 8:return e.next=10,this.getAccount();case 10:return t=e.sent,e.abrupt("return",!!t);case 14:return e.prev=14,e.t0=e.catch(0),e.abrupt("return",!1);case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));return function(){return e.apply(this,arguments)}}()},{key:"switchChain",value:function(){var e=(0,i.Z)((0,s.Z)().mark((function e(t){var n,r,i,c,a=this;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getProvider();case 2:if(n=e.sent){e.next=5;break}throw new w.a;case 5:return r=l.hexValue(t),e.prev=6,e.next=9,Promise.all([n.request({method:"wallet_switchEthereumChain",params:[{chainId:r}]}),new Promise((function(e){return a.on("change",(function(n){var r=n.chain;(null===r||void 0===r?void 0:r.id)===t&&e()}))}))]);case 9:return e.abrupt("return",null!==(i=this.chains.find((function(e){return e.chainId===t})))&&void 0!==i?i:{chainId:t,name:"Chain ".concat(r),slug:"".concat(r),nativeCurrency:{name:"Ether",decimals:18,symbol:"ETH"},rpc:[""],chain:"",shortName:"",testnet:!0});case 12:if(e.prev=12,e.t0=e.catch(6),c=this.chains.find((function(e){return e.chainId===t}))){e.next=17;break}throw new w.C({chainId:t,connectorId:this.id});case 17:if(4902!==e.t0.code){e.next=34;break}return e.prev=18,e.next=21,n.request({method:"wallet_addEthereumChain",params:[{chainId:r,chainName:c.name,nativeCurrency:c.nativeCurrency,rpcUrls:(0,g.g)(c),blockExplorerUrls:this.getBlockExplorerUrls(c)}]});case 21:return e.next=23,this.getChainId();case 23:if(e.sent===t){e.next=26;break}throw new w.U(new Error("User rejected switch after adding network."));case 26:return e.abrupt("return",c);case 29:if(e.prev=29,e.t1=e.catch(18),!this.isUserRejectedRequestError(e.t1)){e.next=33;break}throw new w.U(e.t1);case 33:throw new w.A(e.t1.message);case 34:if(!this.isUserRejectedRequestError(e.t0)){e.next=36;break}throw new w.U(e.t0);case 36:throw new w.S(e.t0);case 37:case"end":return e.stop()}}),e,this,[[6,12],[18,29]])})));return function(t){return e.apply(this,arguments)}}()},{key:"watchAsset",value:function(){var e=(0,i.Z)((0,s.Z)().mark((function e(t){var n,r,i,c,a,o;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.address,r=t.decimals,i=void 0===r?18:r,c=t.image,a=t.symbol,e.next=3,this.getProvider();case 3:if(o=e.sent){e.next=6;break}throw new w.a;case 6:return e.abrupt("return",o.request({method:"wallet_watchAsset",params:{type:"ERC20",options:{address:n,decimals:i,image:c,symbol:a}}}));case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"setupListeners",value:function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getProvider();case 2:(t=e.sent).on&&(t.on("accountsChanged",this.onAccountsChanged),t.on("chainChanged",this.onChainChanged),t.on("disconnect",this.onDisconnect));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"isUserRejectedRequestError",value:function(e){return 4001===e.code}},{key:"injectedProvider",value:function(){var e;return null===(e=window)||void 0===e?void 0:e.ethereum}},{key:"isInjected",value:function(){var e;return!(null===(e=this.injectedProvider())||void 0===e||!e.isFrame)}},{key:"createProvider",value:function(){var e=(0,i.Z)((0,s.Z)().mark((function e(){var t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(549).then(n.t.bind(n,30649,23));case 2:return t=e.sent.default,e.abrupt("return",t("frame"));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),m}(m.W))}}]);
//# sourceMappingURL=4263.98d09d0b.chunk.js.map