"use strict";(self.webpackChunkgeoblocs=self.webpackChunkgeoblocs||[]).push([[4899],{54899:function(e,t,n){n.r(t),n.d(t,{CryptoDefiWalletConnector:function(){return g}});var r=n(74165),s=n(15861),c=n(1413),i=n(15671),o=n(43144),a=n(97326),h=n(60136),u=n(29388),p=n(2600),d=n(38690),l=n(32928),f=n(66131),v=n(97419),x=n(82333),g=(n(65892),function(e){(0,h.Z)(n,e);var t=(0,u.Z)(n);function n(e){var r;(0,i.Z)(this,n);var s={name:"Crypto Defi Wallet",shimDisconnect:!0,shimChainChangedDisconnect:!0,getProvider:x.g},o=(0,c.Z)((0,c.Z)({},s),e.options);return r=t.call(this,{chains:e.chains,options:o,connectorStorage:e.connectorStorage}),(0,p._)((0,a.Z)(r),"id",l.w.cryptoDefiWallet),r}return(0,o.Z)(n,[{key:"connect",value:function(){var e=(0,s.Z)((0,r.Z)().mark((function e(){var t,n,s,c,i,o,a,h,u,p=arguments;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=p.length>0&&void 0!==p[0]?p[0]:{},e.prev=1,e.next=4,this.getProvider();case 4:if(c=e.sent){e.next=7;break}throw new d.a;case 7:if(this.setupListeners(),this.emit("message",{type:"connecting"}),i=null,null===(n=this.options)||void 0===n||!n.shimDisconnect||Boolean(this.connectorStorage.getItem(this.shimDisconnectKey))){e.next=25;break}return e.next=13,this.getAccount().catch((function(){return null}));case 13:if(i=e.sent,!!!i){e.next=25;break}return e.prev=16,e.next=19,c.request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]});case 19:e.next=25;break;case 21:if(e.prev=21,e.t0=e.catch(16),!this.isUserRejectedRequestError(e.t0)){e.next=25;break}throw new d.U(e.t0);case 25:if(i){e.next=30;break}return e.next=28,c.request({method:"eth_requestAccounts"});case 28:o=e.sent,i=v.getAddress(o[0]);case 30:return e.next=32,this.getChainId();case 32:if(a=e.sent,h=this.isChainUnsupported(a),!t.chainId||a===t.chainId){e.next=45;break}return e.prev=35,e.next=38,this.switchChain(t.chainId);case 38:a=t.chainId,h=this.isChainUnsupported(t.chainId),e.next=45;break;case 42:e.prev=42,e.t1=e.catch(35),console.error("Could not switch to chain id : ".concat(t.chainId),e.t1);case 45:if(null===(s=this.options)||void 0===s||!s.shimDisconnect){e.next=48;break}return e.next=48,this.connectorStorage.setItem(this.shimDisconnectKey,"true");case 48:return u={chain:{id:a,unsupported:h},provider:c,account:i},this.emit("connect",u),e.abrupt("return",u);case 53:if(e.prev=53,e.t2=e.catch(1),!this.isUserRejectedRequestError(e.t2)){e.next=57;break}throw new d.U(e.t2);case 57:if(-32002!==e.t2.code){e.next=59;break}throw new d.R(e.t2);case 59:throw e.t2;case 60:case"end":return e.stop()}}),e,this,[[1,53],[16,21],[35,42]])})));return function(){return e.apply(this,arguments)}}()}]),n}(f.InjectedConnector))}}]);
//# sourceMappingURL=4899.b4d4f849.chunk.js.map