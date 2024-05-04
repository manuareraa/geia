"use strict";(self.webpackChunkgeoblocs=self.webpackChunkgeoblocs||[]).push([[1098],{91098:function(e,t,n){n.r(t),n.d(t,{default:function(){return s}});var s=[{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"contractAddress",type:"address"}],name:"ContractSponsorRemoved",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"contractAddress",type:"address"},{indexed:!1,internalType:"address",name:"sponsor",type:"address"}],name:"ContractSponsorSet",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"contractAddress",type:"address"},{indexed:!1,internalType:"address",name:"sponsor",type:"address"}],name:"ContractSponsorshipConfirmed",type:"event"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"},{internalType:"address",name:"user",type:"address"}],name:"allowed",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"}],name:"allowlistEnabled",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"}],name:"confirmSponsorship",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"}],name:"contractOwner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"}],name:"hasPendingSponsor",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"}],name:"hasSponsor",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"}],name:"removeSponsor",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"}],name:"selfSponsoredEnable",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"},{internalType:"address",name:"sponsor",type:"address"}],name:"setSponsor",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"},{internalType:"uint256",name:"feeLimit",type:"uint256"}],name:"setSponsoringFeeLimit",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"},{internalType:"enum SponsoringModeT",name:"mode",type:"uint8"}],name:"setSponsoringMode",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"},{internalType:"uint32",name:"rateLimit",type:"uint32"}],name:"setSponsoringRateLimit",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"}],name:"sponsor",outputs:[{components:[{internalType:"bool",name:"status",type:"bool"},{components:[{internalType:"address",name:"eth",type:"address"},{internalType:"uint256",name:"sub",type:"uint256"}],internalType:"struct CrossAddress",name:"value",type:"tuple"}],internalType:"struct OptionCrossAddress",name:"",type:"tuple"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"}],name:"sponsoringEnabled",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"}],name:"sponsoringFeeLimit",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"}],name:"sponsoringRateLimit",outputs:[{internalType:"uint32",name:"",type:"uint32"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes4",name:"interfaceID",type:"bytes4"}],name:"supportsInterface",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"},{internalType:"address",name:"user",type:"address"},{internalType:"bool",name:"isAllowed",type:"bool"}],name:"toggleAllowed",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"contractAddress",type:"address"},{internalType:"bool",name:"enabled",type:"bool"}],name:"toggleAllowlist",outputs:[],stateMutability:"nonpayable",type:"function"}]}}]);