"use strict";(self.webpackChunkgeoblocs=self.webpackChunkgeoblocs||[]).push([[9645],{59645:function(t,r,e){e.d(r,{E:function(){return S},a:function(){return A}});var n=e(29439),a=e(74165),c=e(43144),u=e(15671),i=e(4942),s=e(15861),o=e(6222),p=e(2257),f=e(31714),h=e(68365),l=e(22105),m=e(31109),d=e(36980),Z=e(79601),v=e(44554),w=e(46413),y=e(75580),W=e(59349);function b(t,r){return g.apply(this,arguments)}function g(){return(g=(0,s.Z)((0,a.Z)().mark((function t(r,e){var n;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.read("decimals",[]);case 2:return n=t.sent,t.abrupt("return",o.parseUnits(h.cv.parse(e),n));case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var x=(0,c.Z)((function t(r,e){var n=this;(0,u.Z)(this,t),(0,i.Z)(this,"featureName",h.cC.name),(0,i.Z)(this,"tokens",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=d.T,t.t1=n.contractWrapper,t.next=4,n.erc20.normalizeAmount(r);case 4:return t.t2=t.sent,t.t3=[t.t2],t.t4={contractWrapper:t.t1,method:"burn",args:t.t3},t.abrupt("return",t.t0.fromContractWrapper.call(t.t0,t.t4));case 8:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())),(0,i.Z)(this,"from",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=d.T,t.t1=n.contractWrapper,t.next=4,Promise.all([(0,h.aL)(r),n.erc20.normalizeAmount(e)]);case 4:return t.t2=t.sent,t.t3={contractWrapper:t.t1,method:"burnFrom",args:t.t2},t.abrupt("return",t.t0.fromContractWrapper.call(t.t0,t.t3));case 7:case"end":return t.stop()}}),t)})));return function(r,e){return t.apply(this,arguments)}}())),this.erc20=r,this.contractWrapper=e})),k=(0,c.Z)((function t(r,e,n){var c=this;(0,u.Z)(this,t),(0,i.Z)(this,"featureName",h.cD.name),(0,i.Z)(this,"to",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e,n){var u;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.erc20.normalizeAmount(e);case 2:return u=t.sent,t.next=5,c.conditions.getClaimTransaction(r,u,n);case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})));return function(r,e,n){return t.apply(this,arguments)}}())),this.erc20=r,this.contractWrapper=e,this.storage=n;var o=new m.C(this.contractWrapper,h.bg,this.storage);this.conditions=new Z.D(this.contractWrapper,o,this.storage)})),C=(0,c.Z)((function t(r,e,n){(0,u.Z)(this,t),this.erc20=r,this.contractWrapper=e,this.storage=n,this.claim=new k(this.erc20,this.contractWrapper,this.storage)})),T=(0,c.Z)((function t(r,e){var c=this;(0,u.Z)(this,t),(0,i.Z)(this,"featureName",h.cE.name),(0,i.Z)(this,"to",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){var e,u,i;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new f.C(c.contractWrapper),t.next=3,Promise.all(r.map((function(t){return Promise.all([(0,h.aL)(t.toAddress),c.erc20.normalizeAmount(t.amount)])})));case 3:return u=t.sent,i=u.map((function(t){var r=(0,n.Z)(t,2),a=r[0],c=r[1];return e.encode("mintTo",[a,c])})),t.abrupt("return",d.T.fromContractWrapper({contractWrapper:c.contractWrapper,method:"multicall",args:[i]}));case 6:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())),this.erc20=r,this.contractWrapper=e})),P=function(){function t(r,e){var n=this;(0,u.Z)(this,t),(0,i.Z)(this,"featureName",h.cF.name),(0,i.Z)(this,"to",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.getMintTransaction(r,e);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(r,e){return t.apply(this,arguments)}}())),this.erc20=r,this.contractWrapper=e,this.batch=this.detectErc20BatchMintable()}return(0,c.Z)(t,[{key:"getMintTransaction",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=d.T,t.t1=this.contractWrapper,t.next=4,Promise.all([(0,h.aL)(r),this.erc20.normalizeAmount(e)]);case 4:return t.t2=t.sent,t.t3={contractWrapper:t.t1,method:"mintTo",args:t.t2},t.abrupt("return",t.t0.fromContractWrapper.call(t.t0,t.t3));case 7:case"end":return t.stop()}}),t,this)})));return function(r,e){return t.apply(this,arguments)}}()},{key:"detectErc20BatchMintable",value:function(){if((0,m.d)(this.contractWrapper,"ERC20BatchMintable"))return new T(this.erc20,this.contractWrapper)}}]),t}(),A=function(){function t(r,e){var c=this;(0,u.Z)(this,t),(0,i.Z)(this,"featureName",h.cG.name),(0,i.Z)(this,"mint",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){var e,u,i,s,o,f;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=r.payload,u=r.signature,t.next=4,Promise.all([c.mapPayloadToContractStruct(e),c.contractWrapper.getCallOverrides()]);case 4:return i=t.sent,s=(0,n.Z)(i,2),o=s[0],f=s[1],t.next=10,(0,y.s)(c.contractWrapper,p.O$.from(o.price),e.currencyAddress,f);case 10:return t.abrupt("return",d.T.fromContractWrapper({contractWrapper:c.contractWrapper,method:"mintWithSignature",args:[o,u],overrides:f}));case 11:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())),(0,i.Z)(this,"mintBatch",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){var e,n,u,i;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all(r.map((function(t){return c.mapPayloadToContractStruct(t.payload)})));case 2:return e=t.sent,n=r.map((function(t,r){var n=e[r],a=t.signature,c=t.payload.price;if(p.O$.from(c).gt(0))throw new Error("Can only batch free mints. For mints with a price, use regular mint()");return{message:n,signature:a}})),u=new f.C(c.contractWrapper),i=n.map((function(t){return u.encode("mintWithSignature",[t.message,t.signature])})),t.abrupt("return",d.T.fromContractWrapper({contractWrapper:c.contractWrapper,method:"multicall",args:[i]}));case 7:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())),this.contractWrapper=r,this.roles=e}return(0,c.Z)(t,[{key:"verify",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){var e,n,c,u;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=r.payload,n=r.signature,t.next=4,this.mapPayloadToContractStruct(e);case 4:return c=t.sent,t.next=7,this.contractWrapper.read("verify",[c,n]);case 7:return u=t.sent,t.abrupt("return",u[0]);case 9:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"generate",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.generateBatch([r]);case 2:return t.abrupt("return",t.sent[0]);case 3:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"generateBatch",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){var e,c,u,i,s,o,p,f,h,l,m=this;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null!==(e=this.roles)&&void 0!==e){t.next=4;break}t.t0=void 0,t.next=10;break;case 4:return t.t1=e,t.t2=["minter"],t.next=8,this.contractWrapper.getSignerAddress();case 8:t.t3=t.sent,t.t0=t.t1.verify.call(t.t1,t.t2,t.t3);case 10:return t.next=12,t.t0;case 12:return t.next=14,Promise.all([this.contractWrapper.getChainID(),this.contractWrapper.read("name",[]),Promise.all(r.map((function(t){return W.S.parseAsync(t)})))]);case 14:return c=t.sent,u=(0,n.Z)(c,3),i=u[0],s=u[1],o=u[2],p=this.contractWrapper.getSigner(),(0,v.Z)(p,"No signer available"),t.next=23,Promise.all(o.map((function(t){return W.n.parseAsync(t)})));case 23:return f=t.sent,t.next=26,Promise.all(f.map((function(t){return m.mapPayloadToContractStruct(t)})));case 26:return h=t.sent,t.next=29,Promise.all(h.map((function(t){return m.contractWrapper.signTypedData(p,{name:s,version:"1",chainId:i,verifyingContract:m.contractWrapper.address},{MintRequest:W.M},t)})));case 29:return l=t.sent,t.abrupt("return",o.map((function(t,r){return{payload:f[r],signature:l[r].toString()}})));case 31:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"mapPayloadToContractStruct",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){var e,c,u,i,s;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([(0,w.n)(this.contractWrapper.getProvider(),r.price,r.currencyAddress),this.contractWrapper.read("decimals",[])]);case 2:return e=t.sent,c=(0,n.Z)(e,2),u=c[0],i=c[1],s=o.parseUnits(r.quantity,i),t.abrupt("return",{to:r.to,primarySaleRecipient:r.primarySaleRecipient,quantity:s,price:u,currency:r.currencyAddress,validityEndTimestamp:r.mintEndTime,validityStartTimestamp:r.mintStartTime,uid:r.uid});case 8:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()}]),t}(),S=function(){function t(r,e,c){var o=this;(0,u.Z)(this,t),(0,i.Z)(this,"featureName",h.cH.name),(0,i.Z)(this,"transfer",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=d.T,t.t1=o.contractWrapper,t.next=4,Promise.all([(0,h.aL)(r),o.normalizeAmount(e)]);case 4:return t.t2=t.sent,t.t3={contractWrapper:t.t1,method:"transfer",args:t.t2},t.abrupt("return",t.t0.fromContractWrapper.call(t.t0,t.t3));case 7:case"end":return t.stop()}}),t)})));return function(r,e){return t.apply(this,arguments)}}())),(0,i.Z)(this,"transferFrom",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e,n){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=d.T,t.t1=o.contractWrapper,t.next=4,Promise.all([(0,h.aL)(r),(0,h.aL)(e),o.normalizeAmount(n)]);case 4:return t.t2=t.sent,t.t3={contractWrapper:t.t1,method:"transferFrom",args:t.t2},t.abrupt("return",t.t0.fromContractWrapper.call(t.t0,t.t3));case 7:case"end":return t.stop()}}),t)})));return function(r,e,n){return t.apply(this,arguments)}}())),(0,i.Z)(this,"setAllowance",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=d.T,t.t1=o.contractWrapper,t.next=4,Promise.all([(0,h.aL)(r),o.normalizeAmount(e)]);case 4:return t.t2=t.sent,t.t3={contractWrapper:t.t1,method:"approve",args:t.t2},t.abrupt("return",t.t0.fromContractWrapper.call(t.t0,t.t3));case 7:case"end":return t.stop()}}),t)})));return function(r,e){return t.apply(this,arguments)}}())),(0,i.Z)(this,"transferBatch",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){var e,c;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new f.C(o.contractWrapper),t.next=3,Promise.all(r.map((function(t){return Promise.all([o.normalizeAmount(t.amount),(0,h.aL)(t.toAddress)])})));case 3:return c=t.sent.map((function(t){var r=(0,n.Z)(t,2),a=r[0],c=r[1];return e.encode("transfer",[c,a])})),t.abrupt("return",d.T.fromContractWrapper({contractWrapper:o.contractWrapper,method:"multicall",args:[c]}));case 5:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())),(0,i.Z)(this,"mint",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=o.mintTo,t.next=3,o.contractWrapper.getSignerAddress();case 3:return t.t1=t.sent,t.t2=r,t.abrupt("return",t.t0.prepare.call(t.t0,t.t1,t.t2));case 6:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())),(0,i.Z)(this,"mintTo",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,l.a)(o.mintable,h.cF).to.prepare(r,e));case 1:case"end":return t.stop()}}),t)})));return function(r,e){return t.apply(this,arguments)}}())),(0,i.Z)(this,"mintBatchTo",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){var e;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,l.a)(null===(e=o.mintable)||void 0===e?void 0:e.batch,h.cE).to.prepare(r));case 1:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())),(0,i.Z)(this,"burn",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,l.a)(o.burnable,h.cC).tokens.prepare(r));case 1:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}())),(0,i.Z)(this,"burnFrom",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,l.a)(o.burnable,h.cC).from.prepare(r,e));case 1:case"end":return t.stop()}}),t)})));return function(r,e){return t.apply(this,arguments)}}())),(0,i.Z)(this,"claim",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=o.claimTo,t.next=3,o.contractWrapper.getSignerAddress();case 3:return t.t1=t.sent,t.t2=r,t.t3=e,t.abrupt("return",t.t0.prepare.call(t.t0,t.t1,t.t2,t.t3));case 7:case"end":return t.stop()}}),t)})));return function(r,e){return t.apply(this,arguments)}}())),(0,i.Z)(this,"claimTo",(0,d.d)(function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e,n){var c;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,l.a)(null===(c=o.droppable)||void 0===c?void 0:c.claim,h.cD).to.prepare(r,e,n));case 1:case"end":return t.stop()}}),t)})));return function(r,e,n){return t.apply(this,arguments)}}())),this.contractWrapper=r,this.storage=e,this.mintable=this.detectErc20Mintable(),this.burnable=this.detectErc20Burnable(),this.droppable=this.detectErc20Droppable(),this.signatureMintable=this.detectErc20SignatureMintable(),this._chainId=c}return(0,c.Z)(t,[{key:"chainId",get:function(){return this._chainId}},{key:"onNetworkUpdated",value:function(t){this.contractWrapper.updateSignerOrProvider(t)}},{key:"getAddress",value:function(){return this.contractWrapper.address}},{key:"get",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,f.f)(this.contractWrapper.getProvider(),this.getAddress());case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"balance",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=this,t.next=3,this.contractWrapper.getSignerAddress();case 3:return t.t1=t.sent,t.next=6,t.t0.balanceOf.call(t.t0,t.t1);case 6:return t.abrupt("return",t.sent);case 7:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"balanceOf",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=this,t.t1=this.contractWrapper,t.next=4,(0,h.aL)(r);case 4:return t.t2=t.sent,t.t3=[t.t2],t.next=8,t.t1.read.call(t.t1,"balanceOf",t.t3);case 8:return t.t4=t.sent,t.abrupt("return",t.t0.getValue.call(t.t0,t.t4));case 10:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"totalSupply",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=this,t.next=3,this.contractWrapper.read("totalSupply",[]);case 3:return t.t1=t.sent,t.next=6,t.t0.getValue.call(t.t0,t.t1);case 6:return t.abrupt("return",t.sent);case 7:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"allowance",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){var e,c,u,i;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([this.contractWrapper.getSignerAddress(),(0,h.aL)(r)]);case 2:return e=t.sent,c=(0,n.Z)(e,2),u=c[0],i=c[1],t.next=8,this.allowanceOf(u,i);case 8:return t.abrupt("return",t.sent);case 9:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"allowanceOf",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e){var n;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([(0,h.aL)(r),(0,h.aL)(e)]);case 2:return n=t.sent,t.t0=this,t.next=6,this.contractWrapper.read("allowance",n);case 6:return t.t1=t.sent,t.next=9,t.t0.getValue.call(t.t0,t.t1);case 9:return t.abrupt("return",t.sent);case 10:case"end":return t.stop()}}),t,this)})));return function(r,e){return t.apply(this,arguments)}}()},{key:"getMintTransaction",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r,e){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,l.a)(this.mintable,h.cF).getMintTransaction(r,e));case 1:case"end":return t.stop()}}),t,this)})));return function(r,e){return t.apply(this,arguments)}}()},{key:"claimConditions",get:function(){var t;return(0,l.a)(null===(t=this.droppable)||void 0===t?void 0:t.claim,h.cD).conditions}},{key:"signature",get:function(){return(0,l.a)(this.signatureMintable,h.cG)}},{key:"normalizeAmount",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",b(this.contractWrapper,r));case 1:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"getValue",value:function(){var t=(0,s.Z)((0,a.Z)().mark((function t(r){return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,f.a)(this.contractWrapper.getProvider(),this.getAddress(),p.O$.from(r));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t,this)})));return function(r){return t.apply(this,arguments)}}()},{key:"detectErc20Mintable",value:function(){if((0,m.d)(this.contractWrapper,"ERC20"))return new P(this,this.contractWrapper)}},{key:"detectErc20Burnable",value:function(){if((0,m.d)(this.contractWrapper,"ERC20Burnable"))return new x(this,this.contractWrapper)}},{key:"detectErc20Droppable",value:function(){if((0,m.d)(this.contractWrapper,"ERC20ClaimConditionsV1")||(0,m.d)(this.contractWrapper,"ERC20ClaimConditionsV2")||(0,m.d)(this.contractWrapper,"ERC20ClaimPhasesV1")||(0,m.d)(this.contractWrapper,"ERC20ClaimPhasesV2"))return new C(this,this.contractWrapper,this.storage)}},{key:"detectErc20SignatureMintable",value:function(){if((0,m.d)(this.contractWrapper,"ERC20SignatureMintable"))return new A(this.contractWrapper)}}]),t}()}}]);
//# sourceMappingURL=9645.e22329a7.chunk.js.map