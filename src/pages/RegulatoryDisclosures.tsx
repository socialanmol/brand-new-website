import React, { useState, useMemo } from "react";

/* ------------------------------------------------------------------ Data Sets */

const AMC_DATA = [
  { name: "Aditya Birla Sun Life Mutual Fund", reg: "MF/020/94/8" },
  { name: "Axis Mutual Fund", reg: "MF/061/09/02" },
  { name: "Bajaj Finserv Mutual Fund", reg: "MF/078/23/04" },
  { name: "Bandhan Mutual Fund", reg: "MF/042/00/3" },
  { name: "Bank of India Mutual Fund", reg: "MF/056/08/01" },
  { name: "Baroda BNP Paribas Mutual Fund", reg: "MF/018/94/2" },
  { name: "Canara Robeco Mutual Fund", reg: "MF/004/93/4" },
  { name: "CRB Mutual Fund", reg: "MF/008/93/5" },
  { name: "DSP Mutual Fund", reg: "MF/036/97/7" },
  { name: "Edelweiss Mutual Fund", reg: "MF/057/08/02" },
  { name: "Franklin Templeton Mutual Fund", reg: "MF/026/96/8" },
  { name: "Groww Mutual Fund", reg: "MF/068/11/03" },
  { name: "HDFC Mutual Fund", reg: "MF/044/00/6" },
  { name: "Helios Mutual Fund", reg: "MF/079/23/05" },
  { name: "HSBC Mutual Fund", reg: "MF/046/02/5" },
  { name: "ICICI Prudential Mutual Fund", reg: "MF/003/93/6" },
  { name: "IDBI Mutual Fund", reg: "MF/064/10/01" },
  { name: "IIFCL Mutual Fund (IDF)", reg: "MF/071/13/01" },
  { name: "IL&FS IDF Mutual Fund", reg: "MF/072/13/02" },
  { name: "Invesco Mutual Fund", reg: "MF/052/06/01" },
  { name: "ITI Mutual Fund", reg: "MF/073/18/01" },
  { name: "Jio BlackRock Mutual Fund", reg: "MF/085/25/11" },
  { name: "JM Financial Mutual Fund", reg: "MF/015/94/8" },
  { name: "Kotak Mutual Fund", reg: "MF/038/98/1" },
  { name: "LIC Mutual Fund", reg: "MF/012/94/5" },
  { name: "Mahindra Manulife Mutual Fund", reg: "MF/069/16/01" },
  { name: "Mirae Asset Mutual Fund", reg: "MF/055/07/03" },
  { name: "Monarch Networth Capital Limited", reg: "MF/092/26/18" },
  { name: "Motilal Oswal Mutual Fund", reg: "MF/063/09/04" },
  { name: "Navi Mutual Fund", reg: "MF/062/09/03" },
  { name: "Nippon India Mutual Fund", reg: "MF/022/95/1" },
  { name: "NJ Mutual Fund", reg: "MF/076/21/02" },
  { name: "Old Bridge Mutual Fund", reg: "MF/081/23/07" },
  { name: "PGIM India Mutual Fund", reg: "MF/065/10/02" },
  { name: "PPFAS Mutual Fund (Parag Parikh)", reg: "MF/069/12/01" },
  { name: "Quant Mutual Fund", reg: "MF/028/96/4" },
  { name: "Quantum Mutual Fund", reg: "MF/051/05/02" },
  { name: "Samco Mutual Fund", reg: "MF/077/21/03" },
  { name: "SBI Mutual Fund", reg: "MF/009/93/3" },
  { name: "Shriram Mutual Fund", reg: "MF/017/94/4" },
  { name: "Sundaram Mutual Fund", reg: "MF/034/97/2" },
  { name: "Tata Mutual Fund", reg: "MF/023/95/9" },
  { name: "Taurus Mutual Fund", reg: "MF/002/93/" },
  { name: "The Wealth Company Mutual Fund", reg: "MF/086/25/12" },
  { name: "360 ONE Mutual Fund", reg: "MF/067/11/02" },
  { name: "Trust Mutual Fund", reg: "MF/075/19/01" },
  { name: "Union Mutual Fund", reg: "MF/066/11/01" },
  { name: "Unifi Mutual Fund", reg: "MF/082/24/08" },
  { name: "UTI Mutual Fund", reg: "MF/048/03/01" },
  { name: "Wealth First Portfolio Managers Limited", reg: "MF/091/26/17" },
  { name: "WhiteOak Capital Mutual Fund", reg: "MF/074/18/02" },
  { name: "Zerodha Mutual Fund", reg: "MF/080/23/06" },
  { name: "Abakkus Mutual Fund", reg: "MF/088/25/14" },
  { name: "AlphaGrep Mutual Fund", reg: "MF/090/26/16" },
  { name: "Angel One Mutual Fund", reg: "MF/083/24/09" },
  { name: "ASK Mutual Fund", reg: "MF/089/26/15" },
  { name: "Capitalmind Mutual Fund", reg: "MF/084/25/10" },
  { name: "Choice Mutual Fund", reg: "MF/087/25/13" },
];

const SIF_DATA = [
  { amc: "Altiva SIF", code: "SIF-122", name: "Altiva Equity Ex-Top 100 Long-Short Fund - Growth", option: "Growth", isin1: "INF754K30136", isin2: "—", nav: "10.3717", date: "17-Jun-2026" },
  { amc: "Altiva SIF", code: "SIF-123", name: "Altiva Equity Ex-Top 100 Long-Short Fund - IDCW", option: "IDCW", isin1: "INF754K30144", isin2: "—", nav: "10.3717", date: "17-Jun-2026" },
  { amc: "iSIF SIF", code: "SIF-34", name: "iSIF Equity Ex-Top 100 Long-Short Fund - Growth", option: "Growth", isin1: "INF109K30034", isin2: "—", nav: "10.0400", date: "17-Jun-2026" },
  { amc: "qsif SIF", code: "SIF-25", name: "qsif Equity Ex-Top 100 Long-Short Fund - Growth Option", option: "Growth", isin1: "INF966L30183", isin2: "—", nav: "10.3116", date: "17-Jun-2026" },
  { amc: "qsif SIF", code: "SIF-26", name: "qsif Equity Ex-Top 100 Long-Short Fund - IDCW Option", option: "IDCW", isin1: "INF966L30191", isin2: "INF966L30209", nav: "10.3116", date: "17-Jun-2026" },
  { amc: "The Wealth Company MF", code: "SIF-105", name: "WSIF Equity Ex-Top 100 Long-Short Fund Growth", option: "Growth", isin1: "INF2F0030015", isin2: "—", nav: "10.3535", date: "17-Jun-2026" },
  { amc: "The Wealth Company MF", code: "SIF-106", name: "WSIF Equity Ex-Top 100 Long-Short Fund IDCW", option: "IDCW", isin1: "INF2F0030023", isin2: "INF2F0030031", nav: "10.3535", date: "17-Jun-2026" },
  { amc: "Arthaya SIF", code: "SIF-114", name: "Arthaya Equity Long Short Fund - Growth Option", option: "Growth", isin1: "INF582M30012", isin2: "—", nav: "10.1000", date: "17-Jun-2026" },
  { amc: "Arthaya SIF", code: "SIF-115", name: "Arthaya Equity Long Short Fund - IDCW Option", option: "IDCW", isin1: "INF582M30020", isin2: "INF582M30038", nav: "10.1000", date: "17-Jun-2026" },
  { amc: "Arudha SIF", code: "SIF-62", name: "Arudha Equity Long-Short Fund - Growth", option: "Growth", isin1: "INF194K30358", isin2: "—", nav: "10.2320", date: "17-Jun-2026" },
  { amc: "Arudha SIF", code: "SIF-69", name: "Arudha Equity Long-Short Fund - Monthly IDCW", option: "IDCW", isin1: "INF194K30390", isin2: "INF194K30473", nav: "10.1040", date: "17-Jun-2026" },
  { amc: "Arudha SIF", code: "SIF-71", name: "Arudha Equity Long-Short Fund - Quarterly IDCW", option: "IDCW", isin1: "INF194K30408", isin2: "INF194K30481", nav: "10.2320", date: "17-Jun-2026" },
  { amc: "Diviniti SIF", code: "SIF-21", name: "Diviniti Equity Long Short Fund Growth Option", option: "Growth", isin1: "INF00XX30019", isin2: "—", nav: "932.5714", date: "17-Jun-2026" },
  { amc: "Diviniti SIF", code: "SIF-22", name: "Diviniti Equity Long Short Fund IDCW Option", option: "IDCW", isin1: "INF00XX30027", isin2: "INF00XX30035", nav: "932.5714", date: "17-Jun-2026" },
  { amc: "DynaSIF SIF", code: "SIF-55", name: "DynaSIF Equity Long-Short Fund - Growth Option", option: "Growth", isin1: "INF579M30018", isin2: "—", nav: "10.4521", date: "17-Jun-2026" },
  { amc: "DynaSIF SIF", code: "SIF-59", name: "DynaSIF Equity Long-Short Fund - IDCW Option", option: "IDCW", isin1: "INF579M30026", isin2: "INF579M30034", nav: "10.4521", date: "17-Jun-2026" },
  { amc: "Franklin Templeton MF", code: "SIF-96", name: "Sapphire Equity Long-Short SIF - Growth", option: "Growth", isin1: "INF090I30014", isin2: "—", nav: "1003.6296", date: "17-Jun-2026" },
  { amc: "Franklin Templeton MF", code: "SIF-97", name: "Sapphire Equity Long-Short SIF - IDCW", option: "IDCW", isin1: "INF090I30030", isin2: "INF090I30022", nav: "1003.6296", date: "17-Jun-2026" },
  { amc: "iSIF SIF", code: "SIF-126", name: "iSIF Equity Long-Short Fund - Growth", option: "Growth", isin1: "INF109K30075", isin2: "—", nav: "10.1500", date: "17-Jun-2026" },
  { amc: "qsif SIF", code: "SIF-3", name: "qsif Equity Long Short Fund - Growth Option", option: "Growth", isin1: "INF966L30027", isin2: "—", nav: "10.4568", date: "17-Jun-2026" },
  { amc: "qsif SIF", code: "SIF-4", name: "qsif Equity Long Short Fund - IDCW Option", option: "IDCW", isin1: "INF966L30050", isin2: "INF966L30068", nav: "10.4568", date: "17-Jun-2026" },
  { amc: "The Wealth Company MF", code: "SIF-111", name: "WSIF Equity Long-Short Fund Growth", option: "Growth", isin1: "INF2F0030072", isin2: "—", nav: "10.3280", date: "17-Jun-2026" },
  { amc: "The Wealth Company MF", code: "SIF-110", name: "WSIF Equity Long-Short Fund IDCW", option: "IDCW", isin1: "INF2F0030080", isin2: "INF2F0030098", nav: "10.3280", date: "17-Jun-2026" },
  { amc: "Titanium SIF", code: "SIF-102", name: "Titanium Equity Long-Short Fund Growth", option: "Growth", isin1: "INF277K30070", isin2: "—", nav: "10.2071", date: "17-Jun-2026" },
  { amc: "Titanium SIF", code: "SIF-98", name: "Titanium Equity Long-Short Fund IDCW Payout", option: "IDCW - Payout", isin1: "INF277K30096", isin2: "—", nav: "10.2071", date: "17-Jun-2026" },
  { amc: "Titanium SIF", code: "SIF-101", name: "Titanium Equity Long-Short Fund IDCW Reinvestment", option: "IDCW - Reinvestment", isin1: "—", isin2: "INF277K30088", nav: "10.2071", date: "17-Jun-2026" },
  { amc: "qsif SIF", code: "SIF-117", name: "qsif Sector Rotation Long-Short Fund - Growth Option", option: "Growth", isin1: "INF966L30308", isin2: "—", nav: "10.1615", date: "17-Jun-2026" },
  { amc: "qsif SIF", code: "SIF-119", name: "qsif Sector Rotation Long-Short Fund - IDCW Option", option: "IDCW", isin1: "INF966L30324", isin2: "INF966L30316", nav: "10.1615", date: "17-Jun-2026" },
  { amc: "iSIF SIF", code: "SIF-124", name: "iSIF Active Asset Allocator Long-Short Fund - Growth", option: "Growth", isin1: "INF109K30059", isin2: "—", nav: "10.0569", date: "17-Jun-2026" },
  { amc: "iSIF SIF", code: "SIF-35", name: "iSIF Hybrid Long-Short Fund - Growth", option: "Growth", isin1: "INF109K30018", isin2: "—", nav: "10.1122", date: "17-Jun-2026" },
  { amc: "DynaSIF SIF", code: "SIF-87", name: "DynaSIF Active Asset Allocator Long-Short Fund - Growth Option", option: "Growth", isin1: "INF579M30075", isin2: "—", nav: "10.2713", date: "17-Jun-2026" },
  { amc: "DynaSIF SIF", code: "SIF-89", name: "DynaSIF Active Asset Allocator Long-Short Fund - IDCW Option", option: "IDCW", isin1: "INF579M30083", isin2: "INF579M30091", nav: "10.2713", date: "17-Jun-2026" },
  { amc: "qsif SIF", code: "SIF-91", name: "qsif Active Asset Allocator Long-Short Fund - IDCW Option", option: "IDCW", isin1: "INF966L30225", isin2: "INF966L30233", nav: "10.3881", date: "17-Jun-2026" },
  { amc: "qsif SIF", code: "SIF-93", name: "qsif Active Asset Allocator Long-Short Fund - Growth Option", option: "Growth", isin1: "INF966L30217", isin2: "—", nav: "10.3881", date: "17-Jun-2026" },
  { amc: "Altiva SIF", code: "SIF-11", name: "Altiva Hybrid Long-Short Fund - Growth", option: "Growth", isin1: "INF754K30052", isin2: "—", nav: "10.7075", date: "17-Jun-2026" },
  { amc: "Altiva SIF", code: "SIF-12", name: "Altiva Hybrid Long-Short Fund - IDCW", option: "IDCW", isin1: "INF754K30060", isin2: "INF754K30078", nav: "10.5010", date: "17-Jun-2026" },
  { amc: "Apex SIF", code: "SIF-80", name: "Apex Hybrid Long-Short Fund - Growth", option: "Growth", isin1: "INF209K30040", isin2: "—", nav: "10.2165", date: "17-Jun-2026" },
  { amc: "Apex SIF", code: "SIF-81", name: "Apex Hybrid Long-Short Fund - Payout of IDCW", option: "IDCW - Payout", isin1: "INF209K30057", isin2: "INF209K30065", nav: "10.0800", date: "20-Apr-2026" },
  { amc: "Arudha SIF", code: "SIF-40", name: "Arudha Hybrid Long-Short Fund - Growth", option: "Growth", isin1: "INF194K30010", isin2: "—", nav: "10.2350", date: "17-Jun-2026" },
  { amc: "Arudha SIF", code: "SIF-44", name: "Arudha Hybrid Long-Short Fund - Monthly IDCW", option: "IDCW", isin1: "INF194K30051", isin2: "INF194K30135", nav: "10.2350", date: "17-Jun-2026" },
  { amc: "Magnum SIF", code: "SIF-13", name: "Magnum Hybrid Long Short Fund - Growth", option: "Growth", isin1: "INF200K30015", isin2: "—", nav: "10.3550", date: "17-Jun-2026" },
  { amc: "Magnum SIF", code: "SIF-16", name: "Magnum Hybrid Long Short Fund - IDCW", option: "IDCW", isin1: "INF200K30023", isin2: "INF200K30031", nav: "10.3541", date: "17-Jun-2026" },
  { amc: "Mirae Asset MF", code: "SIF-136", name: "Platinum Hybrid Long-Short Fund - Growth", option: "Growth", isin1: "INF769K30019", isin2: "—", nav: "10.0800", date: "17-Jun-2026" },
  { amc: "Mirae Asset MF", code: "SIF-137", name: "Platinum Hybrid Long-Short Fund - IDCW", option: "IDCW", isin1: "INF769K30035", isin2: "INF769K30027", nav: "10.0800", date: "17-Jun-2026" },
  { amc: "qsif SIF", code: "SIF-7", name: "qsif Hybrid Long-Short Fund - Growth Option", option: "Growth", isin1: "INF966L30084", isin2: "—", nav: "10.4341", date: "17-Jun-2026" },
  { amc: "qsif SIF", code: "SIF-8", name: "qsif Hybrid Long-Short Fund - IDCW Option", option: "IDCW", isin1: "INF966L30118", isin2: "INF966L30126", nav: "10.6079", date: "17-Jun-2026" },
  { amc: "Titanium SIF", code: "SIF-29", name: "Titanium Hybrid Long-Short Fund Growth", option: "Growth", isin1: "INF277K30013", isin2: "—", nav: "10.0555", date: "17-Jun-2026" },
  { amc: "Titanium SIF", code: "SIF-30", name: "Titanium Hybrid Long-Short Fund IDCW Payout", option: "IDCW - Payout", isin1: "INF277K30039", isin2: "—", nav: "10.0555", date: "17-Jun-2026" },
  { amc: "Titanium SIF", code: "SIF-27", name: "Titanium Hybrid Long-Short Fund IDCW Reinvestment", option: "IDCW - Reinvestment", isin1: "—", isin2: "INF277K30021", nav: "10.0555", date: "17-Jun-2026" },
];

const PMS_DATA = [
  { name: "Aditya Birla Sun Life Asset Management Company Limited", reg: "INP000000597" },
  { name: "Axis Asset Management Company Limited", reg: "INP000003534" },
  { name: "PGIM India Asset Management Private Limited", reg: "INP000006952" },
  { name: "Edelweiss Asset Management Limited", reg: "INP000004631" },
  { name: "HDFC Asset Management Company Limited", reg: "INP000000506" },
  { name: "ICICI Prudential Asset Management Company Limited", reg: "INP000000373" },
  { name: "360 ONE Asset Management Limited", reg: "INP000004565" },
  { name: "Invesco Asset Management (India) Private Limited", reg: "INP000005273" },
  { name: "JM Financial Asset Management Limited", reg: "INP000009719" },
  { name: "Kotak Mahindra Asset Management Company Limited", reg: "INP000000837" },
  { name: "Motilal Oswal Asset Management Company Limited", reg: "INP000000670" },
  { name: "PPFAS Asset Management Private Limited", reg: "INP000000241" },
  { name: "Quantum Asset Management Company Private Limited", reg: "INP000000187" },
  { name: "Nippon Life India Asset Management Limited", reg: "INP000007085" },
  { name: "SBI Funds Management Limited", reg: "INP000000852" },
  { name: "UTI Asset Management Company Limited", reg: "INP000000860" },
  { name: "WhiteOak Capital Asset Management Limited", reg: "INP000007766" },
  { name: "HSBC Asset Management (India) Private Limited", reg: "INP000001322" },
  { name: "Tata Asset Management Limited", reg: "INP000001058" },
  { name: "NJ Asset Management Private Limited", reg: "INP000003518" },
  { name: "Helios Capital Asset Management (India) Private Limited", reg: "INP000006916" },
  { name: "Old Bridge Capital Management Private Limited", reg: "INP000005174" },
  { name: "Unifi Capital Private Limited", reg: "INP000000613" },
  { name: "Angel One Wealth Limited", reg: "INP000001546" },
  { name: "Capitalmind Asset Management Private Limited", reg: "INP000005847" },
  { name: "Abakkus Asset Manager LLP", reg: "INP000006457" },
  { name: "ASK Investment Managers Limited", reg: "INP000008066" },
  { name: "AlphaGrep Investment Management Private Limited", reg: "INP000007401" },
  { name: "Wealth First Portfolio Managers Limited", reg: "INP000006332" },
  { name: "Monarch Networth Capital Limited", reg: "INP000006059" },
  { name: "Courser Park Advisors LLP", reg: "INP000008303" },
];

const AIF_DATA = [
  { name: "360 ONE Asset Angel Fund 1", reg: "IN/AIF1/21-22/1011" },
  { name: "360 ONE Venture Fund", reg: "IN/AIF1/12-13/0017" },
  { name: "360 ONE Private Equity Fund", reg: "IN/AIF2/12-13/0015" },
  { name: "360 ONE Venture Capital Trust", reg: "IN/AIF2/20-21/0838" },
  { name: "Aditya Birla Sun Life AIF Trust I", reg: "IN/AIF3/17-18/0319" },
  { name: "Aditya Birla Sun Life AIF Trust II", reg: "IN/AIF2/17-18/0513" },
  { name: "Axis Alternative Investment Fund - Category II", reg: "IN/AIF2/17-18/0512" },
  { name: "Axis Alternative Investment Fund - Category III", reg: "IN/AIF3/18-19/0628" },
  { name: "ASK Alternate Investment Fund", reg: "IN/AIF3/23-24/1417" },
  { name: "ASK Curated Luxury Assets Fund", reg: "IN/AIF2/24-25/1650" },
  { name: "ASK Equity AIF", reg: "IN/AIF3/17-18/0378" },
  { name: "ASK Private Credit Fund", reg: "IN/AIF2/23-24/1315" },
  { name: "ASK Real Estate Fund", reg: "IN/AIF2/16-17/0245" },
  { name: "ASK Real Estate Infrastructure Fund", reg: "IN/AIF1/22-23/1188" },
  { name: "ASK Real Estate Special Opportunities Fund", reg: "IN/AIF1/25-26/1854" },
  { name: "ASK Real Estate Special Opportunities Fund - II", reg: "IN/AIF2/14-15/0115" },
  { name: "Capitalmind Select India One", reg: "IN/AIF3/23-24/1357" },
  { name: "Edelweiss Alpha Fund", reg: "IN/AIF3/13-14/0047" },
  { name: "Edelweiss Alternative Equity Trust", reg: "IN/AIF2/21-22/1021" },
  { name: "Edelweiss Alternative Investment Opportunities Trust", reg: "IN/AIF2/17-18/0502" },
  { name: "Edelweiss Alternative Solutions Trust", reg: "IN/AIF2/16-17/0281" },
  { name: "Edelweiss Commercial Advantage Fund", reg: "IN/AIF2/16-17/0266" },
  { name: "Edelweiss Credit Opportunities Trust", reg: "IN/AIF2/21-22/0873" },
  { name: "Edelweiss India Real Estate Fund", reg: "IN/AIF2/16-17/0300" },
  { name: "Edelweiss India Special Situations Fund", reg: "IN/AIF2/17-18/0330" },
  { name: "Edelweiss Infrastructure Yield Plus", reg: "IN/AIF1/17-18/0511" },
  { name: "Edelweiss Multi Strategy Investment Trust", reg: "IN/AIF3/12-13/0004" },
  { name: "Edelweiss Private Alternative Investment Trust", reg: "IN/AIF2/20-21/0782" },
  { name: "Edelweiss Real Estate Opportunities Fund", reg: "IN/AIF2/16-17/0229" },
  { name: "HDFC AMC AIF II", reg: "IN/AIF2/12-13/0038" },
  { name: "HDFC AMC AIF-II A", reg: "IN/AIF2/26-27/2214" },
  { name: "HDFC AMC Structured Credit AIF-I", reg: "IN/AIF2/24-25/1705" },
  { name: "HDFC Capital Affordable Real Estate Fund - 2", reg: "IN/AIF2/17-18/0499" },
  { name: "HDFC Capital Affordable Real Estate Fund - 1", reg: "IN/AIF2/15-16/0160" },
  { name: "HDFC Capital AIF - 3", reg: "IN/AIF2/21-22/0909" },
  { name: "HDFC Capital AIF - 4", reg: "IN/AIF2/24-25/1626" },
  { name: "ICICI Prudential Debt Fund", reg: "IN/AIF2/14-15/0105" },
  { name: "ICICI Prudential Private Capital Fund", reg: "IN/AIF2/21-22/0926" },
  { name: "ICICI Prudential Real Estate AIF", reg: "IN/AIF2/14-15/0112" },
  { name: "ICICI Prudential Strategic Alpha Fund", reg: "IN/AIF3/16-17/0310" },
  { name: "JM Financial Credit Opportunities Fund", reg: "IN/AIF2/22-23/1193" },
  { name: "JM Financial India Growth Trust III", reg: "IN/AIF2/21-22/0949" },
  { name: "JM Financial India Real Estate Trust", reg: "IN/AIF2/25-26/1813" },
  { name: "JM Financial India Trust II", reg: "IN/AIF2/16-17/0309" },
  { name: "JM Financial Pre IPO Trust", reg: "IN/AIF2/25-26/2047" },
  { name: "JM Financial Select Credit Fund", reg: "IN/AIF2/25-26/2059" },
  { name: "JM Financial Yield Enhancer Distressed Opportunity Fund I", reg: "IN/AIF2/19-20/0719" },
  { name: "Kotak Alternate Assets Fund II", reg: "IN/AIF2/18-19/0605" },
  { name: "Kotak Alternate Assets Fund III", reg: "IN/AIF3/18-19/0604" },
  { name: "Kotak Alternate Assets Fund IV", reg: "IN/AIF2/22-23/1088" },
  { name: "Kotak Credit Opportunities Fund Trust", reg: "IN/AIF2/23-24/1268" },
  { name: "Kotak Green Energy Transition Trust", reg: "IN/AIF2/23-24/1454" },
  { name: "Kotak India Affordable Housing Fund - I", reg: "IN/AIF2/18-19/0568" },
  { name: "Kotak India Real Estate Fund - IX", reg: "IN/AIF2/18-19/0537" },
  { name: "Kotak India Real Estate Fund VIII", reg: "IN/AIF2/15-16/0214" },
  { name: "Kotak India Renaissance Fund 1 Trust", reg: "IN/AIF3/21-22/0967" },
  { name: "Kotak India Venture Fund I", reg: "IN/AIF1/25-26/1884" },
  { name: "Kotak India Venture Fund II", reg: "IN/AIF2/17-18/0370" },
  { name: "Kotak Infrastructure Investment Fund", reg: "IN/AIF2/21-22/0875" },
  { name: "Kotak Performing RE Credit Strategy Fund", reg: "IN/AIF2/19-20/0758" },
  { name: "Kotak Performing RE Credit Strategy Fund - II", reg: "IN/AIF2/22-23/1151" },
  { name: "Kotak Real Estate Fund XII", reg: "IN/AIF2/24-25/1627" },
  { name: "Kotak Real Estate Fund - X", reg: "IN/AIF2/22-23/1159" },
  { name: "Kotak Real Estate Investment Fund II", reg: "IN/AIF2/24-25/1621" },
  { name: "Kotak SEAF India Fund", reg: "IN/VCF/04-05/055" },
  { name: "Kotak Special Situations Fund", reg: "IN/AIF2/18-19/0633" },
  { name: "Kotak Strategic Situations Trust", reg: "IN/AIF2/22-23/1167" },
  { name: "Kotak Strategic Solutions Fund III", reg: "IN/AIF2/25-26/2076" },
  { name: "Motilal Oswal Alternative Investment Trust", reg: "IN/AIF3/13-14/0044" },
  { name: "Motilal Oswal Alternative Investment Trust - I", reg: "IN/AIF3/19-20/0779" },
  { name: "Motilal Oswal Wealth AIF", reg: "IN/AIF3/22-23/1142" },
  { name: "Motilal Oswal Wealth Alternates Trust", reg: "IN/AIF2/25-26/2095" },
  { name: "Nippon India AIF Cat III O.E. Trust", reg: "IN/AIF3/18-19/0530" },
  { name: "Nippon India AIF Trust", reg: "IN/AIF2/14-15/0111" },
  { name: "Nippon India Emerging Technology AIF Trust", reg: "IN/AIF2/19-20/0683" },
  { name: "Nippon India Event Opportunities Trust", reg: "IN/AIF3/16-17/0287" },
  { name: "PGIM India Alternative Investment Fund", reg: "IN/AIF3/18-19/0615" },
  { name: "Sundaram Alternative Investment Trust", reg: "IN/AIF3/16-17/0291" },
  { name: "Sundaram Category II Alternative Investment Trust", reg: "IN/AIF2/17-18/0340" },
  { name: "WhiteOak Capital Equity Fund", reg: "IN/AIF3/23-24/1259" },
  { name: "WhiteOak Capital Healthcare Opportunities Fund", reg: "IN/AIF3/25-26/1777" },
  { name: "WhiteOak Capital India Opportunities Fund", reg: "IN/AIF2/24-25/1740" },
  { name: "WhiteOak Capital Private Equity and Pre IPO Fund", reg: "IN/AIF2/26-27/2163" },
  { name: "WhiteOak Capital REIT & InvIT Alternates Fund I", reg: "IN/AIF3/25-26/1994" },
  { name: "Abakkus Growth Fund", reg: "IN/AIF3/18-19/0550" },
  { name: "Abakkus India Equity Trust", reg: "IN/AIF3/23-24/1326" },
  { name: "Helios India Alternate Fund", reg: "IN/AIF3/19-20/0773" },
  { name: "Perpetuity Funds", reg: "IN/AIF3/17-18/0508" },
];

export default function RegulatoryDisclosures() {
  // Accordion open states
  const [openAmc, setOpenAmc] = useState(false);
  const [openSif, setOpenSif] = useState(false);
  const [openPms, setOpenPms] = useState(false);
  const [openAif, setOpenAif] = useState(false);

  // Search filter states
  const [amcQuery, setAmcQuery] = useState("");
  const [sifQuery, setSifQuery] = useState("");
  const [pmsQuery, setPmsQuery] = useState("");
  const [aifQuery, setAifQuery] = useState("");

  // Sort states
  const [amcSortAsc, setAmcSortAsc] = useState(true);
  const [pmsSortAsc, setPmsSortAsc] = useState(true);
  const [aifSortAsc, setAifSortAsc] = useState(true);

  // Copy state
  const [copied, setCopied] = useState(false);

  const handleCopyArn = () => {
    navigator.clipboard.writeText("ARN-114893").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Filtered & sorted lists
  const filteredAmc = useMemo(() => {
    const q = amcQuery.toLowerCase().trim();
    return AMC_DATA.filter(
      (x) => !q || x.name.toLowerCase().includes(q) || x.reg.toLowerCase().includes(q)
    ).sort((a, b) => (amcSortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
  }, [amcQuery, amcSortAsc]);

  const filteredSif = useMemo(() => {
    const q = sifQuery.toLowerCase().trim();
    return SIF_DATA.filter(
      (x) =>
        !q ||
        x.amc.toLowerCase().includes(q) ||
        x.name.toLowerCase().includes(q) ||
        x.code.toLowerCase().includes(q) ||
        x.isin1.toLowerCase().includes(q) ||
        x.isin2.toLowerCase().includes(q)
    );
  }, [sifQuery]);

  const filteredPms = useMemo(() => {
    const q = pmsQuery.toLowerCase().trim();
    return PMS_DATA.filter(
      (x) => !q || x.name.toLowerCase().includes(q) || x.reg.toLowerCase().includes(q)
    ).sort((a, b) => (pmsSortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
  }, [pmsQuery, pmsSortAsc]);

  const filteredAif = useMemo(() => {
    const q = aifQuery.toLowerCase().trim();
    return AIF_DATA.filter(
      (x) => !q || x.name.toLowerCase().includes(q) || x.reg.toLowerCase().includes(q)
    ).sort((a, b) => (aifSortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
  }, [aifQuery, aifSortAsc]);

  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased min-h-screen">
      {/* HERO SECTION */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] py-16 sm:py-24 text-center text-white px-6">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/35 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#8DC63F]">
              AMFI Registered Mutual Fund Distributor
            </span>
          </div>

          <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-3">
            Regulatory Disclosures
          </h1>

          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#8DC63F] mb-6">
            Transparency, compliance &amp; investor protection
          </p>

          <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-2xl mx-auto">
            Distributor registration details, empanelment lists across mutual funds, specialised investment funds, portfolio management services and alternative investment funds, commission disclosure, grievance redressal and mandatory disclaimers for ANMOL SHARE BROKING PVT LTD.
          </p>
        </div>
      </header>

      {/* JUMP NAVIGATION BAR */}
      <nav className="sticky top-0 z-30 bg-white border-b border-[rgba(26,59,159,0.12)] py-2.5 px-4 shadow-sm" aria-label="On this page">
        <div className="max-w-[1120px] mx-auto flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { href: "#distributor", label: "Distributor" },
            { href: "#empanelment", label: "Empanelment" },
            { href: "#sebi", label: "SEBI registry" },
            { href: "#documents", label: "Scheme documents" },
            { href: "#commission", label: "Commission" },
            { href: "#grievance", label: "Grievance" },
            { href: "#disclaimers", label: "Disclaimers" },
            { href: "#awareness", label: "Investor awareness" },
            { href: "#faq", label: "FAQ" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-bold text-[#6B7280] hover:text-[#1A3B9F] bg-gray-50 hover:bg-[#EEF2FB] border border-gray-200 hover:border-[rgba(26,59,159,0.2)] rounded-full px-3.5 py-1.5 whitespace-nowrap transition-all"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT WRAPPER */}
      <main className="max-w-[1120px] mx-auto px-6 py-12 space-y-12">
        {/* 01 ── DISTRIBUTOR INFORMATION */}
        <section id="distributor" className="scroll-mt-20">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-2 py-0.5 rounded">
              01
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Distributor information
            </h2>
          </div>

          <div className="bg-white border border-[rgba(26,59,159,0.12)] border-t-4 border-t-[#8DC63F] rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6">
              <div>
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-1">
                  Legal entity
                </span>
                <span className="text-sm font-semibold text-[#111827]">
                  ANMOL SHARE BROKING PVT LTD
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-1">
                  Brand
                </span>
                <span className="text-sm font-semibold text-[#111827]">
                  MyAnmol
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-1">
                  AMFI registration number
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-[#1A3B9F]">
                    ARN-114893
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyArn}
                    className="text-[10px] font-bold tracking-wider uppercase border border-[#8DC63F] text-[#6AA32A] bg-[#EFF8E2] hover:bg-[#8DC63F] hover:text-[#091540] px-2 py-0.5 rounded transition-colors"
                  >
                    {copied ? "COPIED" : "COPY"}
                  </button>
                </div>
              </div>
              <div>
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-1">
                  Category
                </span>
                <span className="text-sm font-semibold text-[#111827]">
                  AMFI Registered Mutual Fund Distributor
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-1">
                  Initial registration date
                </span>
                <span className="text-sm font-semibold text-[#111827]">
                  16 September 2016
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B7280] mb-1">
                  Current ARN validity
                </span>
                <span className="text-sm font-semibold text-[#111827]">
                  15 September 2028
                </span>
              </div>
            </div>

            <div className="bg-[#EFF8E2] border-l-4 border-[#8DC63F] p-4 rounded-r-xl text-xs sm:text-sm text-[#111827] leading-relaxed space-y-1">
              <p>
                ANMOL SHARE BROKING PVT LTD is registered with the Association of Mutual Funds in India (AMFI) as a mutual fund distributor.
              </p>
              <p className="font-semibold text-[#091540]">
                Registration with AMFI does not guarantee performance or assure returns to investors.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-t border-[rgba(26,59,159,0.1)]" />

        {/* 02 ── EMPANELMENT DETAILS */}
        <section id="empanelment" className="scroll-mt-20">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-2 py-0.5 rounded">
              02
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Empanelment details
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6B7280] font-light leading-relaxed mb-6">
            The lists below include principal entities and fund houses currently associated with MyAnmol, together with certain entities that may be added in future subject to empanelment, commercial arrangements, product availability, internal approvals and applicable regulatory requirements. Inclusion of an entity intended to be added in future should not be construed as an active offering, a recommendation, or a current distribution relationship unless specifically stated otherwise.
          </p>

          <div className="space-y-4">
            {/* Accordion 1: AMCs */}
            <div className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setOpenAmc(!openAmc)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-[#EEF2FB]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center font-bold">
                    🏛️
                  </span>
                  <span className="font-[var(--fd)] text-lg sm:text-xl font-bold text-[#091540]">
                    Mutual fund AMCs
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6AA32A] bg-[#EFF8E2] px-3 py-1 rounded-full">
                    58 AMCs
                  </span>
                  <span className="text-lg font-bold text-[#1A3B9F]">
                    {openAmc ? "−" : "+"}
                  </span>
                </div>
              </button>

              {openAmc && (
                <div className="p-5 border-t border-gray-100 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <input
                      type="search"
                      placeholder="Search AMC name or registration number…"
                      value={amcQuery}
                      onChange={(e) => setAmcQuery(e.target.value)}
                      className="w-full sm:w-80 px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#1A3B9F] focus:outline-none"
                    />
                    <span className="text-xs text-gray-500 font-semibold">
                      Showing <b>{filteredAmc.length}</b> of {AMC_DATA.length} AMCs
                    </span>
                  </div>

                  <div className="border border-gray-200 rounded-xl overflow-y-auto max-h-96">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead className="bg-[#0D1E52] text-white sticky top-0">
                        <tr>
                          <th
                            onClick={() => setAmcSortAsc(!amcSortAsc)}
                            className="p-3 cursor-pointer select-none font-bold uppercase tracking-wider text-[11px]"
                          >
                            AMC Name {amcSortAsc ? "↑" : "↓"}
                          </th>
                          <th className="p-3 font-bold uppercase tracking-wider text-[11px]">
                            SEBI Registration Number
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredAmc.map((row, i) => (
                          <tr key={i} className="hover:bg-[#EFF8E2]/50">
                            <td className="p-3 font-semibold text-[#111827]">{row.name}</td>
                            <td className="p-3 text-gray-500 font-mono text-xs">{row.reg}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: SIF Schemes */}
            <div className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setOpenSif(!openSif)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-[#EEF2FB]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center font-bold">
                    📈
                  </span>
                  <span className="font-[var(--fd)] text-lg sm:text-xl font-bold text-[#091540]">
                    Specialised Investment Funds (SIF)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6AA32A] bg-[#EFF8E2] px-3 py-1 rounded-full">
                    49 Schemes
                  </span>
                  <span className="text-lg font-bold text-[#1A3B9F]">
                    {openSif ? "−" : "+"}
                  </span>
                </div>
              </button>

              {openSif && (
                <div className="p-5 border-t border-gray-100 space-y-4">
                  <p className="text-xs text-gray-500">
                    Schemes under SEBI's Specialised Investment Fund framework. NAV data as at 17 June 2026.
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <input
                      type="search"
                      placeholder="Search AMC, scheme name, code or ISIN…"
                      value={sifQuery}
                      onChange={(e) => setSifQuery(e.target.value)}
                      className="w-full sm:w-80 px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#1A3B9F] focus:outline-none"
                    />
                    <span className="text-xs text-gray-500 font-semibold">
                      Showing <b>{filteredSif.length}</b> of {SIF_DATA.length} schemes
                    </span>
                  </div>

                  <div className="border border-gray-200 rounded-xl overflow-x-auto overflow-y-auto max-h-96">
                    <table className="w-full min-w-[840px] text-left border-collapse text-xs">
                      <thead className="bg-[#0D1E52] text-white sticky top-0">
                        <tr>
                          <th className="p-3">AMC</th>
                          <th className="p-3">SIF Code</th>
                          <th className="p-3">Scheme Name</th>
                          <th className="p-3">Option</th>
                          <th className="p-3">ISIN (Growth / Payout)</th>
                          <th className="p-3">ISIN (Reinvest)</th>
                          <th className="p-3">NAV (₹)</th>
                          <th className="p-3">NAV Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredSif.map((s, i) => (
                          <tr key={i} className="hover:bg-[#EFF8E2]/50">
                            <td className="p-3 font-semibold">{s.amc}</td>
                            <td className="p-3 font-mono">{s.code}</td>
                            <td className="p-3">{s.name}</td>
                            <td className="p-3">{s.option}</td>
                            <td className="p-3 font-mono">{s.isin1}</td>
                            <td className="p-3 font-mono">{s.isin2}</td>
                            <td className="p-3 font-bold text-[#1A3B9F]">{s.nav}</td>
                            <td className="p-3 text-gray-500 whitespace-nowrap">{s.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: PMS */}
            <div className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setOpenPms(!openPms)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-[#EEF2FB]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center font-bold">
                    💼
                  </span>
                  <span className="font-[var(--fd)] text-lg sm:text-xl font-bold text-[#091540]">
                    Portfolio Management Services (PMS)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6AA32A] bg-[#EFF8E2] px-3 py-1 rounded-full">
                    31 Entities
                  </span>
                  <span className="text-lg font-bold text-[#1A3B9F]">
                    {openPms ? "−" : "+"}
                  </span>
                </div>
              </button>

              {openPms && (
                <div className="p-5 border-t border-gray-100 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <input
                      type="search"
                      placeholder="Search entity name or registration number…"
                      value={pmsQuery}
                      onChange={(e) => setPmsQuery(e.target.value)}
                      className="w-full sm:w-80 px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#1A3B9F] focus:outline-none"
                    />
                    <span className="text-xs text-gray-500 font-semibold">
                      Showing <b>{filteredPms.length}</b> of {PMS_DATA.length} entities
                    </span>
                  </div>

                  <div className="border border-gray-200 rounded-xl overflow-y-auto max-h-96">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead className="bg-[#0D1E52] text-white sticky top-0">
                        <tr>
                          <th
                            onClick={() => setPmsSortAsc(!pmsSortAsc)}
                            className="p-3 cursor-pointer select-none font-bold uppercase tracking-wider text-[11px]"
                          >
                            Entity {pmsSortAsc ? "↑" : "↓"}
                          </th>
                          <th className="p-3 font-bold uppercase tracking-wider text-[11px]">
                            SEBI PMS Registration
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredPms.map((row, i) => (
                          <tr key={i} className="hover:bg-[#EFF8E2]/50">
                            <td className="p-3 font-semibold text-[#111827]">{row.name}</td>
                            <td className="p-3 text-gray-500 font-mono text-xs">{row.reg}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 4: AIFs */}
            <div className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setOpenAif(!openAif)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-[#EEF2FB]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#EEF2FB] text-[#1A3B9F] flex items-center justify-center font-bold">
                    🌐
                  </span>
                  <span className="font-[var(--fd)] text-lg sm:text-xl font-bold text-[#091540]">
                    Alternative Investment Funds (AIF)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6AA32A] bg-[#EFF8E2] px-3 py-1 rounded-full">
                    88 Funds
                  </span>
                  <span className="text-lg font-bold text-[#1A3B9F]">
                    {openAif ? "−" : "+"}
                  </span>
                </div>
              </button>

              {openAif && (
                <div className="p-5 border-t border-gray-100 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <input
                      type="search"
                      placeholder="Search fund name or registration number…"
                      value={aifQuery}
                      onChange={(e) => setAifQuery(e.target.value)}
                      className="w-full sm:w-80 px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#1A3B9F] focus:outline-none"
                    />
                    <span className="text-xs text-gray-500 font-semibold">
                      Showing <b>{filteredAif.length}</b> of {AIF_DATA.length} funds
                    </span>
                  </div>

                  <div className="border border-gray-200 rounded-xl overflow-y-auto max-h-96">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead className="bg-[#0D1E52] text-white sticky top-0">
                        <tr>
                          <th
                            onClick={() => setAifSortAsc(!aifSortAsc)}
                            className="p-3 cursor-pointer select-none font-bold uppercase tracking-wider text-[11px]"
                          >
                            Fund Name {aifSortAsc ? "↑" : "↓"}
                          </th>
                          <th className="p-3 font-bold uppercase tracking-wider text-[11px]">
                            SEBI Registration Number
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredAif.map((row, i) => (
                          <tr key={i} className="hover:bg-[#EFF8E2]/50">
                            <td className="p-3 font-semibold text-[#111827]">{row.name}</td>
                            <td className="p-3 text-gray-500 font-mono text-xs">{row.reg}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <hr className="border-t border-[rgba(26,59,159,0.1)]" />

        {/* 03 ── SEBI REGISTRY */}
        <section id="sebi" className="scroll-mt-20">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-2 py-0.5 rounded">
              03
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              SEBI recognised intermediaries
            </h2>
          </div>

          <div className="bg-white border border-[rgba(26,59,159,0.12)] border-t-4 border-t-[#8DC63F] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#EFF8E2] text-[#6AA32A] flex items-center justify-center font-bold shrink-0">
              🛡️
            </div>
            <div>
              <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
                The empanelment lists on this page may not reflect the most recent regulatory additions or changes. For the current, authoritative list of all SEBI-recognised mutual funds, portfolio managers, alternative investment funds and other registered intermediaries, refer to the official SEBI registry. Scheme-related documents and policy disclosures can also be accessed there.
              </p>
              <a
                href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognised=yes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#8DC63F] hover:bg-[#6AA32A] text-[#091540] text-xs font-bold px-4 py-2 rounded-lg transition-colors"
              >
                View SEBI official registry →
              </a>
            </div>
          </div>
        </section>

        <hr className="border-t border-[rgba(26,59,159,0.1)]" />

        {/* 04 ── SCHEME DOCUMENTS */}
        <section id="documents" className="scroll-mt-20">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-2 py-0.5 rounded">
              04
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Scheme related documents
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-light mb-6">
            Investors are encouraged to read all scheme-related documents carefully before making any investment decision. The following are available on the SEBI website for all registered mutual fund schemes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[rgba(26,59,159,0.12)] border-t-4 border-t-[#8DC63F] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-2">
                  Statement of Additional Information (SAI)
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light mb-4">
                  Statutory information about the mutual fund and the AMC that applies across all schemes — constitution, trustees, asset management company, penalties, pending litigation and investor rights.
                </p>
              </div>
              <a
                href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doMutualFund=yes&mftype=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#1A3B9F] border-b border-[#8DC63F] self-start"
              >
                Access SAI on SEBI →
              </a>
            </div>

            <div className="bg-white border border-[rgba(26,59,159,0.12)] border-t-4 border-t-[#8DC63F] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-2">
                  Scheme Information Document (SID)
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light mb-4">
                  The primary offer document for a scheme — investment objective, asset allocation, risk factors, load structure, benchmark, fund manager details and past performance.
                </p>
              </div>
              <a
                href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doMutualFund=yes&mftype=2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#1A3B9F] border-b border-[#8DC63F] self-start"
              >
                Access SID on SEBI →
              </a>
            </div>

            <div className="bg-white border border-[rgba(26,59,159,0.12)] border-t-4 border-t-[#8DC63F] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-2">
                  Key Information Memorandum (KIM)
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light mb-4">
                  A concise summary of the SID, provided to every investor at the point of investment — key features, plans, options, minimum application amount, NAV periodicity and redemption details.
                </p>
              </div>
              <a
                href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doMutualFund=yes&mftype=3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#1A3B9F] border-b border-[#8DC63F] self-start"
              >
                Access KIM on SEBI →
              </a>
            </div>
          </div>
        </section>

        <hr className="border-t border-[rgba(26,59,159,0.1)]" />

        {/* 05 ── COMMISSION DISCLOSURE */}
        <section id="commission" className="scroll-mt-20">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-2 py-0.5 rounded">
              05
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Commission disclosure
            </h2>
          </div>

          <div className="bg-white border border-[rgba(26,59,159,0.12)] border-t-4 border-t-[#8DC63F] rounded-2xl p-6 sm:p-8 shadow-sm">
            <p className="text-sm sm:text-base text-[#111827] leading-relaxed mb-3">
              ANMOL SHARE BROKING PVT LTD acts as a mutual fund distributor and receives trail commission in the range of <strong className="text-[#091540] font-bold">0.05% to 1.5%</strong> from asset management companies, in accordance with applicable SEBI and AMFI regulations.
            </p>
            <p className="text-xs text-gray-500 font-light">
              Investors may request further information on distributor compensation by contacting us using the details below.
            </p>
          </div>
        </section>

        <hr className="border-t border-[rgba(26,59,159,0.1)]" />

        {/* 06 ── GRIEVANCE REDRESSAL */}
        <section id="grievance" className="scroll-mt-20">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-2 py-0.5 rounded">
              06
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Contact &amp; grievance redressal
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#091540] via-[#0D1E52] to-[#1A3B9F] rounded-2xl p-6 sm:p-8 text-white shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div>
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#8DC63F] mb-1">
                  Phone
                </span>
                <a href="tel:+919742826665" className="text-sm font-semibold text-white hover:underline">
                  +91 97428 26665
                </a>
              </div>
              <div>
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#8DC63F] mb-1">
                  Email
                </span>
                <a href="mailto:grievance@myanmol.com" className="text-sm font-semibold text-white hover:underline">
                  grievance@myanmol.com
                </a>
              </div>
              <div>
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#8DC63F] mb-1">
                  Registered office
                </span>
                <p className="text-xs text-white/90 leading-relaxed font-light">
                  4th Floor, No. 39/1, 33rd Cross Road, Jayanagar 4th T Block, Bengaluru 560041
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15 text-xs text-white/70 leading-relaxed space-y-1 font-light">
              <p>
                We are committed to addressing investor concerns promptly and fairly. For service issues, grievances, privacy concerns or to exercise your data rights, contact us using the details above.
              </p>
              <p>
                Investors may also approach the grievance redressal mechanisms available through AMFI and through SEBI (SCORES portal).
              </p>
            </div>
          </div>
        </section>

        <hr className="border-t border-[rgba(26,59,159,0.1)]" />

        {/* 07 ── DISCLAIMERS */}
        <section id="disclaimers" className="scroll-mt-20">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-2 py-0.5 rounded">
              07
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Important disclaimers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[rgba(26,59,159,0.12)] border-t-4 border-t-[#8DC63F] rounded-2xl p-6 shadow-sm">
              <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-2">
                Mutual fund risk
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-light mb-2">
                Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Past performance may or may not be sustained in the future and should not be used as the basis for investment decisions.
              </p>
            </div>

            <div className="bg-white border border-[rgba(26,59,159,0.12)] border-t-4 border-t-[#8DC63F] rounded-2xl p-6 shadow-sm">
              <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-2">
                Informational nature
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-light mb-2">
                The information on this website is provided solely for informational and educational purposes and should not be construed as investment advice, solicitation, recommendation, or an offer to buy or sell any financial product.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Investment decisions should be made after considering individual financial circumstances, objectives and risk tolerance.
              </p>
            </div>

            <div className="bg-white border border-[rgba(26,59,159,0.12)] border-t-4 border-t-[#8DC63F] rounded-2xl p-6 shadow-sm">
              <h3 className="font-[var(--fd)] text-base font-bold text-[#091540] mb-2">
                Regulatory status
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Registration with AMFI, empanelment with asset management companies, or compliance with regulatory requirements does not guarantee returns, assure performance, or protect investors against losses.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-t border-[rgba(26,59,159,0.1)]" />

        {/* 08 ── INVESTOR AWARENESS */}
        <section id="awareness" className="scroll-mt-20">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-2 py-0.5 rounded">
              08
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Investor awareness
            </h2>
          </div>

          <div className="bg-white border border-[rgba(26,59,159,0.12)] rounded-2xl p-6 flex items-start gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#EFF8E2] text-[#6AA32A] flex items-center justify-center font-bold shrink-0">
              💡
            </div>
            <p className="text-sm text-[#4B5563] leading-relaxed font-light">
              Investors are encouraged to make informed decisions after reviewing all relevant scheme-related documents, understanding the associated risks, and evaluating their own financial goals and risk appetite.
            </p>
          </div>
        </section>

        <hr className="border-t border-[rgba(26,59,159,0.1)]" />

        {/* 09 ── FAQ */}
        <section id="faq" className="scroll-mt-20 pb-8">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A3B9F] bg-[#EEF2FB] px-2 py-0.5 rounded">
              09
            </span>
            <h2 className="font-[var(--fd)] text-2xl sm:text-3xl font-bold text-[#091540]">
              Frequently asked questions
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            <details className="py-4 group">
              <summary className="font-[var(--fd)] text-base font-bold text-[#091540] cursor-pointer list-none flex justify-between items-center">
                <span>Is MyAnmol registered with AMFI?</span>
                <span className="text-lg text-[#8DC63F] group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed mt-3">
                Yes. ANMOL SHARE BROKING PVT LTD is registered with the Association of Mutual Funds in India as a mutual fund distributor under ARN-114893, first registered on 16 September 2016 and currently valid to 15 September 2028. Registration with AMFI does not guarantee performance or assure returns to investors.
              </p>
            </details>

            <details className="py-4 group">
              <summary className="font-[var(--fd)] text-base font-bold text-[#091540] cursor-pointer list-none flex justify-between items-center">
                <span>What is ARN-114893?</span>
                <span className="text-lg text-[#8DC63F] group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed mt-3">
                ARN-114893 is the AMFI Registration Number issued to ANMOL SHARE BROKING PVT LTD, which trades as MyAnmol. An ARN identifies a registered mutual fund distributor and can be verified on the AMFI website.
              </p>
            </details>

            <details className="py-4 group">
              <summary className="font-[var(--fd)] text-base font-bold text-[#091540] cursor-pointer list-none flex justify-between items-center">
                <span>How does MyAnmol earn from mutual fund distribution?</span>
                <span className="text-lg text-[#8DC63F] group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed mt-3">
                As a mutual fund distributor, ANMOL SHARE BROKING PVT LTD receives trail commission from asset management companies, in the range of 0.05% to 1.5%, in line with applicable SEBI and AMFI regulations. Investors may request further details of distributor compensation by contacting us.
              </p>
            </details>

            <details className="py-4 group">
              <summary className="font-[var(--fd)] text-base font-bold text-[#091540] cursor-pointer list-none flex justify-between items-center">
                <span>How do I raise a complaint or grievance?</span>
                <span className="text-lg text-[#8DC63F] group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed mt-3">
                Write to grievance@myanmol.com or call +91 97428 26665. Investors may also use the grievance redressal mechanisms available through AMFI and through SEBI's SCORES platform.
              </p>
            </details>

            <details className="py-4 group">
              <summary className="font-[var(--fd)] text-base font-bold text-[#091540] cursor-pointer list-none flex justify-between items-center">
                <span>Does empanelment with an AMC mean a scheme is recommended?</span>
                <span className="text-lg text-[#8DC63F] group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-xs sm:text-sm text-[#4B5563] font-light leading-relaxed mt-3">
                No. Empanelment only means a distribution arrangement exists or may exist in future. It is not a recommendation, an active offering, or an assurance of performance. Investment decisions should follow a reading of the scheme information document and an assessment of your own objectives and risk tolerance.
              </p>
            </details>
          </div>
        </section>
      </main>
    </div>
  );
}