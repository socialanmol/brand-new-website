import React from "react";
import { Link } from "react-router";

const PILLARS = [
  {
    num: "01",
    title: "Investor first",
    desc: "The goal comes before the product. We map where a family wants to go, then choose instruments that get them there - never the other way round.",
  },
  {
    num: "02",
    title: "Clarity over complexity",
    desc: "Finance is made deliberately hard to follow. We translate it into plain language, so a decision is understood before it is signed.",
  },
  {
    num: "03",
    title: "Integrity, in the open",
    desc: "Full disclosure of what we are, what we are paid and what a product can and cannot do. Nothing material is left to the fine print.",
  },
  {
    num: "04",
    title: "Competence, certified",
    desc: "Qualified, registered distributors who keep learning. Credentials are the floor of this profession, not the ceiling.",
  },
  {
    num: "05",
    title: "Relationships that outlast products",
    desc: "A folio lasts years; a relationship should last generations. We stay through the reviews, the corrections and the claims.",
  },
  {
    num: "06",
    title: "Literacy as a service",
    desc: "Every conversation leaves the investor more informed than we found them - whether or not it ends in a transaction.",
  },
];

const INDIA_OUTLINE =
  "M282.2 163.1 L282.1 162.3 L281.8 158.6 L281.6 157.4 L281.4 155.7 L281.1 155.2 L280.8 154.3 L280.4 153.5 L280.1 153.1 L279.9 151.7 L279.9 149.9 L279.9 149.0 L279.4 147.3 L279.0 145.3 L278.4 145.4 L278.1 144.9 L277.9 144.9 L277.1 145.3 L276.4 145.2 L275.9 145.2 L275.9 146.2 L276.0 147.1 L275.8 147.5 L274.6 148.6 L274.2 149.4 L274.3 150.2 L274.4 151.3 L274.2 151.8 L273.7 152.4 L272.9 152.6 L272.3 152.5 L271.9 152.1 L271.5 150.9 L271.2 150.3 L270.8 150.2 L270.5 150.3 L270.5 151.0 L270.5 151.6 L270.4 151.7 L270.2 151.6 L270.0 151.3 L269.4 148.5 L268.6 146.3 L268.5 145.5 L268.8 144.4 L269.2 142.8 L270.2 141.8 L270.3 141.3 L270.5 141.0 L270.7 140.9 L272.0 141.0 L272.5 140.9 L272.9 140.4 L273.4 140.0 L274.0 139.8 L274.4 139.8 L275.1 140.1 L275.4 139.9 L275.6 139.2 L276.0 138.6 L276.2 138.2 L276.6 138.1 L277.2 138.1 L277.4 137.9 L277.6 137.7 L277.8 136.8 L278.5 134.8 L278.8 133.9 L278.9 133.8 L278.8 132.8 L279.1 132.6 L280.3 133.1 L280.9 133.1 L281.2 132.9 L281.3 132.5 L281.2 132.1 L280.2 131.4 L278.6 130.4 L277.1 129.8 L274.3 129.9 L271.6 130.0 L270.8 130.0 L269.8 129.7 L267.3 129.7 L264.3 129.9 L263.2 129.8 L262.6 129.8 L261.5 129.9 L259.7 129.6 L258.4 129.2 L257.3 128.8 L256.0 128.5 L255.7 128.5 L255.5 128.3 L255.3 128.0 L255.3 127.6 L255.6 125.7 L255.3 122.8 L255.6 121.7 L254.5 119.3 L254.1 118.9 L253.6 118.8 L253.3 119.2 L253.1 119.7 L253.3 120.3 L252.9 121.0 L252.1 121.3 L251.2 121.0 L250.4 120.7 L249.4 120.0 L248.6 119.0 L248.6 117.9 L248.2 117.2 L247.8 116.8 L247.4 116.7 L247.1 116.8 L246.9 117.2 L247.1 117.6 L247.4 118.1 L247.3 118.5 L247.0 118.5 L246.6 118.4 L245.9 118.5 L245.3 118.2 L244.9 118.2 L244.5 118.1 L244.5 117.4 L243.9 116.6 L242.9 115.7 L242.0 115.1 L241.5 115.2 L241.3 115.8 L241.3 116.1 L241.7 116.2 L242.1 116.5 L242.3 116.9 L242.2 117.2 L241.6 117.8 L241.2 118.4 L240.2 119.2 L239.4 120.2 L239.2 120.9 L238.9 121.6 L238.7 122.3 L239.0 122.8 L239.3 123.1 L240.4 123.3 L241.4 124.2 L242.3 125.5 L242.8 125.9 L243.7 126.4 L245.4 126.4 L245.6 126.8 L245.9 127.7 L246.2 128.1 L247.1 128.5 L247.1 128.8 L246.9 129.2 L246.5 129.5 L245.8 129.7 L245.2 129.8 L244.5 129.6 L243.5 129.6 L242.3 129.6 L241.5 131.9 L241.0 132.8 L240.6 132.8 L239.7 132.4 L239.4 132.4 L238.4 134.5 L238.2 135.0 L238.1 135.4 L238.7 136.2 L239.3 136.9 L240.1 137.2 L240.7 137.0 L241.2 137.2 L241.8 137.9 L242.7 138.4 L244.1 138.6 L244.9 139.1 L245.0 139.6 L245.0 140.0 L244.8 141.2 L244.7 141.9 L243.9 143.8 L243.4 145.4 L243.7 146.1 L243.9 146.4 L244.1 146.7 L244.7 147.3 L245.1 147.8 L244.7 149.3 L244.9 149.7 L245.7 150.0 L246.6 150.2 L246.9 150.5 L246.2 152.0 L246.3 153.0 L246.6 154.0 L246.9 155.7 L246.9 155.8 L246.8 156.2 L247.3 157.5 L248.1 160.0 L248.1 160.9 L248.1 161.9 L247.9 163.5 L247.1 163.5 L247.8 164.6 L248.0 165.4 L248.1 166.5 L247.3 166.6 L246.7 166.5 L246.2 165.5 L246.0 166.4 L245.1 167.2 L244.8 166.8 L244.6 166.4 L244.6 165.6 L245.1 162.8 L245.0 162.5 L244.8 162.3 L244.3 162.1 L244.1 161.6 L243.4 164.6 L243.7 165.8 L243.6 166.4 L242.2 166.9 L240.9 165.7 L240.7 165.4 L240.6 166.0 L240.4 166.8 L239.1 166.6 L238.5 166.0 L238.9 165.0 L239.7 162.5 L239.8 161.4 L238.8 160.6 L237.9 160.1 L237.4 158.9 L237.5 160.2 L238.0 160.6 L238.7 160.9 L239.5 161.6 L238.9 162.3 L238.4 162.8 L237.4 164.7 L236.2 165.7 L234.8 166.5 L230.2 167.6 L229.2 168.1 L227.8 169.5 L226.9 170.8 L226.7 172.2 L227.2 173.6 L227.7 175.9 L228.0 176.4 L227.5 177.2 L226.7 178.1 L225.9 179.3 L226.0 180.0 L225.8 180.4 L223.4 181.9 L222.9 182.8 L222.2 183.6 L221.4 183.2 L220.9 183.2 L221.6 183.8 L221.5 184.3 L221.3 184.6 L220.7 184.8 L217.1 185.9 L214.5 186.9 L213.7 186.9 L213.8 186.6 L214.3 186.3 L214.3 185.1 L213.8 184.9 L213.3 184.8 L211.3 186.2 L210.5 187.7 L210.6 187.9 L211.1 187.9 L212.5 187.1 L213.1 187.3 L213.2 187.6 L211.1 188.8 L206.7 192.8 L206.5 193.6 L205.9 194.5 L205.1 195.4 L203.7 197.4 L201.0 200.4 L200.2 201.5 L195.9 203.9 L195.1 204.5 L193.3 206.8 L191.5 208.7 L189.3 210.2 L185.6 212.2 L183.3 214.0 L182.6 215.2 L182.6 215.7 L182.8 216.3 L183.3 216.8 L183.3 217.3 L183.1 218.1 L183.0 218.5 L182.4 219.6 L181.2 220.4 L177.6 222.0 L177.1 222.0 L174.1 221.6 L173.0 221.9 L172.5 222.7 L171.5 225.9 L170.5 226.7 L170.1 227.5 L170.0 228.0 L169.4 228.0 L168.9 227.7 L168.5 227.9 L168.1 226.8 L167.4 226.6 L166.8 226.6 L164.2 227.6 L163.4 228.5 L161.5 232.5 L161.0 235.1 L161.5 238.0 L162.1 240.3 L162.2 241.3 L162.2 242.7 L161.8 243.3 L161.6 244.1 L161.9 245.7 L162.7 247.8 L162.9 248.7 L162.9 249.6 L163.5 251.7 L163.1 251.3 L162.8 250.4 L162.0 249.3 L161.1 250.4 L161.6 251.2 L163.3 252.2 L163.8 253.0 L162.7 260.0 L161.9 262.5 L160.9 264.1 L160.3 264.7 L159.1 267.3 L158.3 270.4 L158.1 271.6 L158.5 273.0 L158.1 273.8 L157.5 274.4 L158.6 274.1 L158.9 274.8 L159.0 275.6 L159.1 280.0 L158.9 284.7 L158.2 284.9 L157.3 284.9 L156.5 284.8 L156.0 284.6 L154.6 284.9 L153.9 285.4 L153.3 286.2 L153.3 287.7 L150.8 291.4 L150.3 292.6 L150.1 293.8 L150.4 294.4 L151.0 295.0 L151.9 295.3 L153.5 295.5 L154.3 295.9 L154.8 296.5 L152.9 295.8 L150.6 295.7 L145.2 297.4 L143.8 298.6 L143.0 299.6 L142.5 302.0 L142.4 303.6 L141.7 304.9 L138.9 307.0 L137.2 307.6 L136.5 308.1 L134.4 307.4 L132.1 305.6 L131.2 304.7 L127.8 300.1 L127.2 299.5 L126.5 297.6 L126.4 296.8 L126.2 296.5 L125.9 296.3 L125.7 296.0 L125.0 293.8 L124.6 291.4 L124.2 288.8 L124.6 289.0 L125.1 289.9 L125.4 291.1 L125.4 292.9 L125.9 293.1 L126.2 292.9 L125.2 288.9 L124.2 287.9 L124.0 287.8 L123.7 287.2 L123.7 286.4 L123.8 286.0 L123.0 284.7 L122.7 283.9 L121.1 279.9 L120.3 277.0 L119.1 273.9 L118.4 272.7 L117.2 270.3 L116.2 269.2 L115.2 267.6 L114.4 267.0 L114.0 266.6 L111.6 261.3 L110.9 258.4 L110.2 257.0 L109.9 256.0 L109.1 251.5 L109.1 250.7 L109.0 249.8 L108.3 247.9 L107.3 245.8 L107.0 244.6 L107.0 244.1 L106.3 242.1 L106.2 241.2 L105.7 240.3 L105.2 239.5 L104.6 238.9 L103.3 236.9 L102.9 236.4 L102.0 235.1 L101.3 232.7 L100.5 231.7 L101.8 231.7 L101.0 230.9 L100.7 230.3 L100.3 229.9 L100.8 229.0 L99.9 229.0 L99.4 228.5 L98.7 226.8 L97.4 224.9 L97.2 223.9 L96.0 220.7 L95.1 212.9 L94.2 209.5 L94.3 208.5 L93.2 205.6 L92.7 203.6 L92.5 201.9 L92.2 200.8 L92.0 198.6 L91.6 197.9 L91.5 197.5 L91.8 196.5 L92.6 194.9 L92.8 193.9 L92.5 192.5 L91.8 194.0 L91.2 194.4 L90.9 193.3 L90.9 191.9 L90.8 191.5 L91.0 191.0 L92.7 191.3 L90.7 190.4 L90.5 189.8 L90.4 189.4 L90.8 188.7 L90.1 188.1 L89.9 186.2 L89.6 185.8 L89.6 185.5 L90.0 182.9 L91.6 177.8 L91.8 176.7 L91.6 175.1 L91.2 173.8 L91.1 172.4 L91.0 172.1 L90.4 171.9 L89.8 171.4 L89.1 169.4 L89.7 168.7 L90.2 168.4 L89.6 168.5 L89.0 168.5 L90.0 167.5 L90.9 166.8 L93.0 166.0 L93.9 165.4 L92.6 165.9 L91.2 166.1 L88.4 166.0 L88.8 164.1 L89.3 163.5 L89.9 163.1 L89.1 163.2 L88.2 163.1 L88.5 161.2 L89.2 160.8 L90.0 160.7 L90.9 160.4 L89.9 160.1 L88.8 159.9 L87.5 160.3 L86.3 160.0 L84.9 160.0 L85.5 160.3 L86.1 160.9 L85.8 161.9 L85.5 162.6 L84.7 163.0 L84.0 163.7 L83.8 164.3 L83.5 164.7 L84.1 165.0 L84.8 165.2 L85.1 165.7 L85.6 166.4 L85.6 167.7 L83.8 170.9 L83.3 171.7 L79.0 173.6 L77.3 174.6 L73.7 176.0 L72.3 176.3 L70.7 176.0 L68.4 174.9 L65.0 172.3 L64.1 171.4 L61.3 168.0 L59.3 166.2 L57.8 164.5 L55.9 162.9 L54.2 160.8 L53.8 159.8 L53.9 158.8 L54.6 158.3 L55.3 158.5 L56.0 159.3 L56.4 159.7 L56.8 159.9 L59.4 158.6 L60.4 158.6 L61.1 158.0 L62.0 158.1 L63.8 157.1 L64.6 157.1 L65.5 156.9 L66.9 154.3 L68.0 152.7 L68.7 152.4 L68.7 152.0 L68.5 151.5 L68.0 151.6 L67.6 152.1 L67.3 152.7 L67.0 153.0 L66.2 152.7 L65.6 152.8 L64.9 153.0 L62.3 153.9 L61.2 154.8 L60.5 154.9 L56.4 154.0 L52.3 151.8 L50.6 150.4 L49.5 148.6 L48.4 146.4 L48.8 145.8 L50.5 144.5 L51.9 143.5 L50.6 144.0 L49.2 144.6 L48.5 145.0 L47.7 146.0 L46.7 146.2 L46.3 144.8 L46.0 143.5 L46.7 143.0 L47.1 142.7 L48.1 142.5 L49.1 142.3 L50.1 142.3 L51.4 142.3 L51.4 139.2 L51.6 138.9 L51.7 138.8 L52.0 138.7 L52.1 138.7 L52.4 139.2 L52.8 139.2 L53.1 138.9 L53.9 139.1 L54.6 139.0 L55.2 139.2 L56.4 139.2 L58.4 139.1 L59.5 139.1 L60.2 139.6 L61.0 140.2 L61.9 140.2 L63.1 140.2 L64.0 140.0 L64.4 139.5 L64.7 139.0 L66.6 138.3 L68.5 137.7 L69.0 137.6 L69.2 137.9 L69.1 138.5 L69.4 139.1 L70.1 139.4 L70.7 139.5 L71.2 139.4 L71.5 139.2 L72.3 138.4 L72.7 138.2 L73.3 138.2 L73.9 137.8 L73.9 137.5 L73.5 137.3 L73.2 136.9 L73.2 136.5 L73.1 136.0 L73.2 135.5 L73.5 135.1 L73.9 134.8 L73.6 134.1 L73.0 132.7 L72.2 130.9 L71.5 129.4 L70.6 128.1 L70.1 127.1 L70.1 125.0 L70.0 124.6 L69.7 124.3 L69.3 124.2 L68.6 124.4 L68.1 124.4 L66.9 124.4 L66.3 124.2 L64.7 122.0 L64.5 121.2 L64.5 120.3 L65.0 118.9 L65.2 117.5 L65.3 116.2 L65.2 115.8 L64.9 115.4 L64.3 115.1 L62.9 115.0 L61.2 114.6 L59.9 113.8 L59.0 113.3 L58.7 113.1 L58.6 112.7 L58.9 111.1 L59.3 109.4 L59.6 108.8 L60.1 108.3 L60.5 107.9 L61.1 107.4 L62.8 105.7 L64.2 103.4 L65.2 101.8 L65.6 101.3 L66.1 100.9 L66.8 100.4 L67.7 100.0 L68.5 100.0 L69.3 100.4 L69.8 100.9 L70.0 101.9 L70.4 102.6 L70.9 103.1 L71.5 103.3 L72.2 103.2 L75.2 102.0 L76.2 101.7 L78.7 101.6 L80.4 101.1 L81.9 100.6 L82.0 99.7 L82.6 98.4 L84.4 96.6 L84.8 95.8 L85.4 94.3 L85.9 92.9 L86.4 92.4 L89.2 90.9 L91.8 89.5 L92.3 88.9 L94.0 86.0 L95.0 84.0 L95.3 83.4 L95.9 81.7 L96.5 80.0 L97.3 79.6 L99.1 79.0 L100.6 78.4 L101.4 77.7 L101.8 77.0 L101.7 76.4 L101.3 75.7 L101.4 75.2 L101.5 74.8 L102.5 73.9 L104.5 71.3 L105.7 70.0 L106.1 70.0 L107.4 69.3 L108.6 68.6 L108.5 68.2 L108.4 67.7 L107.7 67.5 L107.5 67.0 L107.6 66.2 L108.2 64.1 L108.1 63.5 L107.4 61.5 L107.5 60.9 L107.8 60.4 L108.6 59.6 L109.6 59.0 L112.8 57.5 L113.5 57.4 L114.6 57.0 L115.3 56.2 L115.4 55.6 L115.1 55.2 L114.4 54.6 L113.1 54.1 L112.0 53.7 L110.1 53.7 L109.1 53.3 L108.8 53.1 L108.7 52.1 L108.9 50.6 L108.6 50.4 L108.2 50.6 L107.1 50.4 L105.9 50.5 L105.4 50.0 L105.7 49.5 L105.6 48.8 L105.4 48.1 L105.2 48.0 L104.6 47.8 L103.7 47.3 L102.9 46.6 L102.5 46.1 L102.4 45.7 L102.4 45.5 L102.9 44.9 L103.6 44.0 L103.8 43.3 L103.9 42.8 L103.7 42.4 L103.1 41.9 L102.5 41.4 L102.2 41.1 L102.2 40.5 L102.5 39.8 L103.2 39.3 L104.5 38.8 L104.9 38.2 L104.8 37.7 L104.5 37.6 L103.5 37.6 L102.0 37.4 L101.7 37.2 L101.5 36.8 L101.5 36.5 L101.9 36.1 L102.3 35.6 L102.2 35.1 L101.7 34.6 L100.6 34.2 L100.5 33.7 L100.6 33.2 L101.0 32.5 L101.3 32.1 L102.1 30.8 L103.0 30.5 L104.1 30.1 L105.4 29.6 L107.3 30.0 L108.2 30.1 L110.1 30.5 L111.7 30.9 L113.3 31.0 L113.9 30.9 L114.7 31.3 L116.5 32.0 L118.0 32.4 L119.0 32.4 L120.5 31.8 L121.2 31.2 L122.2 30.6 L123.5 30.6 L126.2 29.7 L126.7 29.9 L127.6 29.9 L128.5 29.4 L129.1 28.8 L129.1 28.5 L129.4 28.2 L130.4 27.8 L131.5 27.3 L131.8 26.5 L132.0 26.0 L133.1 25.4 L134.3 24.7 L135.6 24.0 L137.0 23.2 L138.2 22.5 L139.2 22.0 L139.3 22.0 L139.3 22.1 L139.7 22.4 L140.1 22.5 L140.6 22.3 L141.3 22.1 L141.6 22.2 L141.6 22.5 L141.3 24.0 L141.3 24.6 L141.9 25.8 L142.7 27.7 L143.4 29.6 L143.9 30.8 L144.3 31.3 L146.2 31.8 L147.7 32.2 L148.5 32.9 L149.5 33.5 L150.2 33.9 L150.5 34.5 L150.6 34.9 L150.6 35.2 L150.2 35.6 L148.4 36.7 L148.2 37.0 L148.2 37.5 L148.5 38.8 L148.7 39.6 L148.8 41.3 L148.9 42.8 L149.5 43.5 L150.0 44.0 L150.3 44.4 L151.0 45.0 L151.5 45.4 L151.9 45.7 L152.1 46.3 L152.0 46.9 L151.8 47.5 L151.9 47.8 L152.2 48.0 L152.8 48.6 L152.9 49.5 L152.8 50.0 L153.0 50.6 L153.1 51.1 L152.9 52.6 L153.0 53.2 L153.0 53.3 L152.5 53.3 L152.1 53.5 L151.5 54.4 L150.8 54.7 L150.1 54.7 L149.3 54.2 L148.6 53.6 L148.5 53.3 L148.3 52.7 L147.9 52.3 L147.3 52.4 L146.3 52.5 L145.2 52.7 L145.0 52.8 L144.9 53.1 L145.2 53.6 L145.4 54.3 L145.6 55.3 L145.9 56.0 L146.0 56.2 L147.7 58.2 L148.2 58.7 L148.3 58.9 L148.1 59.7 L147.8 60.5 L147.9 61.2 L148.5 61.9 L148.9 62.5 L148.5 63.2 L148.2 64.0 L148.5 64.4 L148.4 65.5 L148.5 65.8 L148.8 65.9 L149.3 65.8 L149.9 65.5 L150.3 65.4 L150.6 65.5 L150.9 64.6 L151.3 64.5 L151.9 64.7 L153.1 66.4 L154.1 67.8 L154.4 68.1 L154.6 68.2 L155.6 69.0 L156.3 69.4 L157.3 69.3 L158.5 69.2 L159.3 69.7 L159.7 70.0 L159.7 70.1 L159.8 70.1 L161.3 71.2 L162.0 71.1 L162.4 71.4 L162.5 72.2 L162.3 73.0 L162.4 73.4 L163.0 73.5 L164.5 74.0 L165.7 74.5 L166.4 74.7 L167.1 75.0 L167.7 75.6 L169.0 76.3 L170.0 76.9 L170.3 77.6 L169.9 77.5 L169.3 77.6 L168.7 77.9 L168.4 78.1 L167.1 79.4 L166.4 79.8 L165.8 80.4 L164.4 82.2 L163.6 83.8 L163.0 85.4 L163.0 86.5 L162.8 87.8 L162.2 88.5 L161.8 88.7 L161.3 89.9 L161.0 91.1 L161.2 91.6 L162.0 92.1 L162.7 92.7 L163.7 93.3 L164.6 93.8 L165.1 93.9 L165.3 93.6 L165.5 93.3 L166.2 93.4 L167.0 94.0 L167.5 94.4 L167.8 94.6 L169.2 95.3 L170.4 96.0 L171.8 96.7 L172.2 97.2 L172.5 97.7 L173.2 98.4 L174.9 99.6 L176.3 100.4 L177.5 101.1 L178.4 101.6 L178.9 101.5 L179.3 101.3 L179.7 101.1 L180.2 101.3 L180.9 101.6 L182.6 102.8 L184.2 103.7 L186.0 103.5 L186.4 103.6 L186.7 104.4 L187.0 105.2 L188.9 105.8 L190.2 106.0 L191.6 106.5 L192.3 106.8 L193.1 106.4 L193.3 106.0 L193.9 105.8 L194.9 105.9 L196.8 106.5 L197.6 106.7 L198.2 106.1 L199.5 105.8 L200.1 105.5 L201.4 106.2 L203.9 107.0 L205.1 107.5 L205.4 108.1 L205.6 108.5 L205.5 109.7 L205.8 110.2 L208.3 111.4 L209.1 111.9 L209.7 112.1 L210.1 112.1 L210.4 112.3 L210.6 112.9 L210.7 113.1 L211.2 113.3 L211.7 113.4 L213.3 112.8 L214.4 112.3 L215.2 112.4 L215.7 112.9 L215.7 113.7 L216.0 114.4 L216.6 114.8 L217.2 114.8 L218.6 114.3 L219.8 114.7 L220.9 114.9 L222.1 115.1 L222.6 115.3 L223.8 115.9 L225.4 116.6 L225.9 116.5 L228.4 115.3 L228.6 115.4 L229.1 116.6 L229.9 117.0 L231.0 117.3 L232.2 116.7 L233.2 116.9 L234.4 116.9 L235.5 116.6 L236.5 116.5 L237.9 117.1 L238.2 117.0 L238.5 116.6 L239.0 115.0 L239.5 113.5 L239.4 112.7 L239.0 111.4 L237.9 109.8 L237.8 109.3 L238.2 106.4 L238.6 104.7 L238.9 104.0 L239.3 102.8 L239.4 102.3 L239.4 101.9 L239.0 101.6 L238.9 101.2 L239.0 100.9 L239.3 100.8 L240.6 100.6 L242.0 100.1 L242.6 99.9 L243.1 99.6 L243.5 99.3 L243.9 99.3 L245.2 99.8 L245.7 100.2 L245.9 101.2 L246.1 101.6 L246.0 102.7 L245.2 105.2 L245.3 106.2 L246.0 106.9 L246.5 107.4 L246.5 107.6 L245.3 108.4 L245.1 108.8 L245.3 109.3 L245.8 109.6 L246.0 110.0 L246.2 111.1 L246.8 111.4 L248.0 112.1 L249.0 112.6 L250.8 112.2 L251.3 112.5 L252.2 112.7 L252.9 112.8 L253.3 113.0 L253.5 113.1 L253.5 113.4 L253.5 113.6 L254.5 113.6 L255.0 113.8 L256.7 113.5 L258.5 113.2 L259.3 112.3 L259.6 112.2 L260.6 111.8 L261.6 112.2 L262.7 112.8 L263.3 113.0 L264.4 113.0 L265.6 113.0 L268.2 112.7 L269.7 112.9 L271.1 112.0 L271.4 112.1 L272.0 112.7 L273.4 112.7 L274.2 112.4 L275.1 112.2 L275.6 112.1 L276.1 112.1 L276.6 112.2 L277.1 112.0 L277.3 111.6 L277.3 110.9 L276.9 110.2 L276.6 109.8 L276.6 109.6 L276.6 109.1 L276.9 108.4 L277.4 107.6 L277.1 106.9 L276.5 106.0 L276.2 105.9 L275.2 106.1 L274.1 106.0 L273.3 105.5 L272.7 104.8 L272.6 104.3 L272.7 103.6 L273.0 103.0 L273.1 102.7 L273.8 102.7 L274.9 102.9 L275.7 103.0 L276.4 103.0 L277.6 102.2 L278.1 102.2 L278.8 102.0 L279.0 101.9 L279.2 102.0 L279.9 102.1 L280.6 102.1 L281.3 101.8 L281.9 101.5 L283.1 100.8 L283.3 100.3 L283.3 100.0 L283.1 99.7 L282.9 99.6 L282.9 99.3 L283.4 98.7 L285.2 97.8 L286.6 96.8 L287.5 96.0 L287.8 95.1 L288.3 94.1 L288.7 93.7 L289.8 93.4 L292.7 93.0 L293.7 92.6 L295.0 91.8 L295.7 91.2 L296.1 90.8 L296.1 90.2 L297.1 90.0 L297.8 89.2 L298.8 88.3 L300.5 87.5 L302.0 86.5 L302.5 86.7 L303.1 87.2 L303.4 87.7 L303.4 88.0 L305.3 88.3 L305.6 88.2 L307.1 88.7 L308.4 89.3 L309.1 89.4 L309.4 89.4 L309.7 89.2 L310.1 88.7 L310.4 88.4 L310.7 88.2 L310.6 87.6 L312.5 86.5 L314.2 85.7 L315.7 85.1 L316.1 85.4 L316.6 85.8 L317.2 86.9 L317.6 87.2 L318.6 87.1 L318.8 87.2 L318.6 87.6 L317.9 88.1 L317.1 88.6 L316.5 88.9 L316.7 90.2 L316.7 90.6 L316.9 90.7 L318.7 89.5 L319.5 89.3 L319.8 89.6 L319.9 90.2 L320.7 91.6 L320.9 92.3 L319.2 93.9 L318.5 94.7 L318.5 95.0 L318.5 95.3 L318.0 95.8 L318.1 95.9 L318.4 96.2 L318.9 96.4 L319.1 96.4 L319.5 96.0 L321.2 95.4 L321.6 95.5 L322.8 96.4 L323.4 96.4 L324.8 96.7 L325.7 96.4 L326.4 96.7 L327.8 97.8 L328.1 98.0 L328.0 98.6 L327.9 99.3 L328.3 99.9 L328.3 100.4 L328.2 100.9 L328.0 101.2 L327.2 101.4 L326.5 101.9 L325.5 102.7 L324.6 103.4 L324.0 103.9 L323.8 104.5 L323.9 105.3 L324.1 106.1 L326.0 109.0 L326.0 109.5 L325.4 109.6 L324.6 109.3 L323.8 108.8 L323.0 107.6 L322.4 107.2 L321.8 107.1 L318.0 107.8 L317.2 107.9 L315.9 108.4 L315.0 109.3 L314.4 110.2 L313.8 110.5 L312.8 111.2 L310.1 113.2 L308.6 114.1 L307.6 114.4 L306.9 114.9 L306.5 115.6 L306.2 116.2 L306.1 117.5 L306.3 119.1 L306.7 120.1 L306.9 120.4 L306.9 120.7 L306.6 121.2 L306.0 121.7 L305.8 122.0 L305.6 123.5 L305.1 124.2 L304.3 125.3 L303.6 126.1 L302.4 126.7 L302.0 127.3 L301.6 128.2 L301.3 129.0 L301.3 129.3 L301.5 129.5 L301.9 129.8 L302.5 130.1 L302.8 130.5 L302.8 131.0 L302.4 132.3 L301.6 134.0 L300.7 135.3 L299.8 136.6 L299.6 137.0 L298.8 138.6 L298.1 140.8 L297.6 142.3 L297.2 143.3 L296.7 143.3 L296.1 143.0 L294.6 142.6 L293.6 142.2 L292.9 141.9 L292.4 141.9 L291.8 142.1 L291.1 142.3 L290.7 142.1 L289.7 141.2 L289.5 141.3 L289.3 141.7 L289.9 144.3 L290.3 145.3 L290.2 146.9 L290.1 148.9 L289.8 151.0 L289.7 151.5 L289.3 152.1 L288.8 152.2 L288.3 152.0 L287.9 152.1 L287.8 152.4 L287.9 153.4 L287.4 154.4 L287.1 155.3 L287.2 156.2 L287.3 157.1 L287.9 159.1 L287.9 159.8 L287.8 160.4 L287.5 160.7 L287.0 160.7 L286.7 160.9 L286.5 161.3 L286.0 162.8 L285.4 163.0 L284.9 162.7 L284.1 161.7 L283.6 161.5 L283.3 161.5 L283.2 161.7 L282.9 162.3 L282.7 162.7 L282.2 163.1 Z M294.9 321.1 L294.3 322.0 L293.2 319.4 L292.7 319.2 L292.7 318.0 L292.9 317.5 L294.3 316.9 L294.6 317.2 L295.3 319.7 L294.9 321.1 Z M293.4 315.7 L292.5 316.6 L292.1 316.1 L292.2 315.6 L292.6 315.4 L293.0 315.1 L293.4 315.7 Z M290.6 310.2 L289.8 310.2 L289.6 309.8 L289.3 309.3 L289.5 308.9 L289.9 308.8 L290.5 309.5 L290.6 310.0 L290.6 310.2 Z M291.5 308.4 L291.0 308.7 L290.9 308.7 L290.9 308.4 L290.8 308.2 L290.8 307.8 L290.7 307.1 L291.1 306.6 L291.4 306.7 L291.3 307.3 L291.5 308.4 Z M93.4 306.1 L93.3 306.3 L93.2 306.3 L93.1 306.3 L93.0 306.2 L93.0 306.1 L93.2 306.2 L93.3 306.1 L93.5 305.7 L93.6 305.6 L93.6 305.7 L93.6 305.9 L93.4 306.1 Z M287.7 306.3 L288.0 306.7 L287.4 306.7 L286.9 306.1 L287.1 305.5 L287.2 305.3 L287.7 306.3 Z M284.2 297.1 L283.8 297.1 L283.6 296.8 L283.5 296.4 L283.8 296.1 L284.0 296.0 L284.2 296.0 L284.5 296.7 L284.2 297.1 Z M281.5 282.3 L281.2 282.6 L280.2 282.4 L280.3 281.3 L280.0 280.2 L280.2 279.8 L281.0 279.0 L281.6 278.7 L282.0 279.7 L282.2 280.7 L281.5 282.3 Z M90.7 275.5 L90.6 275.6 L90.6 275.4 L90.7 275.1 L90.8 274.9 L90.8 274.9 L90.8 275.1 L90.7 275.4 L90.7 275.5 Z M283.3 273.7 L282.9 273.9 L282.4 273.6 L282.8 273.2 L282.8 272.3 L283.3 272.8 L283.3 273.3 L283.3 273.7 Z M286.5 266.8 L286.9 268.2 L286.1 267.6 L285.9 267.2 L286.3 266.9 L286.5 266.8 Z M283.6 258.2 L283.3 258.9 L283.2 257.4 L283.3 257.2 L283.5 257.2 L283.7 257.3 L283.6 258.2 Z M283.6 272.0 L283.4 272.3 L283.1 272.0 L282.2 270.1 L282.0 268.9 L281.8 268.5 L282.1 267.9 L282.5 267.7 L282.7 267.1 L282.8 266.0 L283.2 265.2 L283.3 265.0 L284.1 264.9 L284.3 264.8 L284.1 264.0 L283.7 263.7 L283.6 263.5 L283.6 261.5 L283.7 260.8 L284.0 260.2 L283.8 259.1 L283.9 258.6 L284.4 258.0 L284.7 256.7 L284.5 256.3 L284.9 254.4 L284.9 253.0 L285.6 251.7 L286.6 251.1 L286.9 251.1 L286.9 252.2 L287.0 252.6 L286.5 253.3 L287.0 254.1 L286.9 254.5 L286.7 255.1 L286.3 255.8 L285.8 256.1 L285.4 257.0 L285.2 257.4 L286.0 258.3 L286.2 261.6 L285.6 262.5 L285.0 262.6 L285.1 264.8 L285.0 265.3 L284.4 266.4 L284.2 266.8 L283.9 267.3 L284.0 267.8 L284.3 268.1 L284.3 268.5 L284.0 269.7 L284.0 271.0 L283.6 272.0 Z";

const HUBS = [
  { name: "Ludhiana", x: 120.4, y: 70.0, anchor: "end", dx: -8, dy: 4 },
  { name: "New Delhi", x: 133.5, y: 93.8, anchor: "start", dx: 8, dy: 4 },
  { name: "Jaipur", x: 119.8, y: 111.6, anchor: "end", dx: -8, dy: 4 },
  { name: "Dibrugarh", x: 304.8, y: 105.7, anchor: "start", dx: 8, dy: 4 },
  { name: "Ranchi", x: 211.9, y: 148.8, anchor: "start", dx: 8, dy: 4 },
  { name: "Bengaluru", x: 137.2, y: 257.1, anchor: "start", dx: 8, dy: 4 },
];

const OFFICES = [
  {
    city: "Bengaluru",
    state: "KARNATAKA",
    address: [
      "4th Floor, 39/1, 33rd Cross",
      "Road, Above Iyengar's",
      "Bakery, 4th T Block East",
      "Pattabhirama Nagar,",
      "Jayanagar, Bengaluru,",
      "Karnataka 560041",
    ],
    mapQuery: "39/1+33rd+Cross+Road+Jayanagar+4th+T+Block+Bengaluru+560041",
  },
  {
    city: "Jaipur",
    state: "RAJASTHAN",
    address: [
      "Second Floor, Plot No. 501",
      "Opposite Centre for",
      "Happiness, Rani Sati Nagar,",
      "Nirman Nagar, Ajmer Road,",
      "Jaipur 302019",
    ],
    mapQuery: "Plot+No+501+Rani+Sati+Nagar+Nirman+Nagar+Jaipur+302019",
  },
  {
    city: "New Delhi",
    state: "DELHI NCR",
    address: [
      "E-4, 2nd Floor",
      "Defence Colony, Main",
      "Ring Road",
      "New Delhi 110024",
    ],
    mapQuery: "Defence+Colony+Main+Ring+Road+New+Delhi+110024",
  },
  {
    city: "Ludhiana",
    state: "PUNJAB",
    address: [
      "B-16, 577/8-A",
      "Vishwakarma Street,",
      "Gill Road",
      "Ludhiana 141003",
    ],
    mapQuery: "Vishwakarma+Street+Gill+Road+Ludhiana+141003",
  },


  {
    city: "Dibrugarh",
    state: "ASSAM",
    address: [
      "No. 6, Prerna,",
      "Chowkidinghi,",
      "P.O. C.R. Building,",
      "Dibrugarh 786003",
    ],
    mapQuery: "Chowkidinghi+CR+Building+Dibrugarh+786003",
  },

];

export default function OurJourney() {
  return (
    <div className="font-[var(--fs)] bg-white text-[#111827] antialiased">
      {/* ── SECTION 1: WHY WE DO THIS ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1180px] mx-auto px-6">
          <h1 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight text-[#091540] mb-12">
            Why we do this
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Card Left: Where we serve / Investor */}
            <div className="bg-white border border-[rgba(26,59,159,0.18)] rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-4">
                  Where we serve
                </span>
                <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-extrabold text-[#091540] tracking-tight leading-tight mb-6">
                  To make every Indian an{" "}
                  <span className="text-[#1A3B9F]">informed</span> investor.
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-[#4B5563] font-light leading-relaxed">
                  <p>
                    Households reach their financial goals when they are guided
                    by credible, qualified distributors - professionals with a
                    visible presence on the web, a brand of their own, and the
                    standing this work deserves.
                  </p>
                  <p>
                    When household savings are channelled into the right
                    instruments, two things grow together: the financial literacy
                    of a population, and the economy it belongs to.
                  </p>
                </div>
              </div>
            </div>

            {/* Card Right: Our Mission */}
            <div className="bg-white border border-[rgba(26,59,159,0.18)] rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-4">
                  Our mission
                </span>
                <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-extrabold text-[#091540] tracking-tight leading-tight mb-6">
                  To bring every stakeholder in Indian finance onto one platform.
                </h2>
                <p className="text-sm sm:text-base text-[#4B5563] font-light leading-relaxed mb-8">
                  Financial literacy is a social cause, an educational cause and a
                  business cause at once. We build the common ground where all
                  three meet - and where every party gains from the same outcome.
                </p>
              </div>

              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-[.16em] text-[#1A3B9F] block mb-3">
                  Who that includes
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "Manufacturers",
                    "Financial Distributors",
                    "Investors at Large",
                    "Government & Regulators",
                    "Educational Bodies",
                  ].map((label, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-lg border border-[rgba(26,59,159,0.22)] bg-[#EFF8E2]/60 text-xs font-bold text-[#1A3B9F]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: OPERATING PRINCIPLES (6 CARDS) ── */}
      <section className="py-14 sm:py-20 bg-[#F8FAFE] border-y border-[rgba(26,59,159,0.08)]">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#1A3B9F] block mb-2">
              Our Core Philosophy
            </span>
            <h2 className="font-[var(--fd)] text-3xl sm:text-4xl font-bold text-[#091540] tracking-tight">
              Principles that guide our practice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((item) => (
              <div
                key={item.num}
                className="bg-white border-2 border-[#1A3B9F] rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all"
              >
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#1A3B9F] block mb-3">
                  {item.num}
                </span>
                <h3 className="font-[var(--fd)] text-2xl font-bold text-[#091540] tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-[15px] text-[#4B5563] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PAN-INDIA FOOTPRINT HERO ── */}
      <section className="py-16 sm:py-24 bg-[#091540] text-white relative overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            {/* Left Copy */}
            <div>
              <h2 className="font-[var(--fd)] text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-4">
                Where ever you are, <br />
                <span className="text-[#8DC63F]">we are already there.</span>
              </h2>
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed mb-8 max-w-lg">
                Goal-mapped financial planning{" "}
                <span className="text-[#8DC63F] font-semibold">
                  for families across India
                </span>{" "}
                - and for{" "}
                <span className="text-[#8DC63F] font-semibold">
                  Indians worldwide.
                </span>
              </p>

            </div>

            {/* Right Map Visual */}
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-[420px] bg-gradient-to-b from-[#0D1E52] to-[#091540] rounded-3xl p-5 sm:p-6 border border-white/10 shadow-2xl flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs font-bold text-white/60">
                  <span>Pan-India Presence</span>
                  <span className="text-[#8DC63F]">6 Regional Hubs</span>
                </div>

                <svg
                  viewBox="0 0 430 344"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Map of India with offices in Ludhiana, New Delhi, Jaipur, Dibrugarh, Ranchi, and Bengaluru"
                >
                  <path
                    d={INDIA_OUTLINE}
                    fill="rgba(141,198,63,0.14)"
                    stroke="#8DC63F"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  {HUBS.map((hub) => (
                    <g key={hub.name}>
                      <circle cx={hub.x} cy={hub.y} r="8" fill="#8DC63F" opacity="0.28">
                        <animate attributeName="r" values="4;10;4" dur="2.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.4;0;0.4" dur="2.6s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={hub.x} cy={hub.y} r="3.4" fill="#8DC63F" stroke="#091540" strokeWidth="1" />
                      <text
                        x={hub.x + hub.dx}
                        y={hub.y + hub.dy}
                        textAnchor={hub.anchor}
                        fill="#ffffff"
                        fontSize="12"
                        fontWeight="700"
                        style={{ paintOrder: "stroke", stroke: "#091540", strokeWidth: 3.5 }}
                      >
                        {hub.name}
                      </text>
                    </g>
                  ))}
                </svg>

                <div className="text-[11px] text-white/50 text-center font-light border-t border-white/10 pt-3">
                  Advisory sessions conducted both physically at offices &amp; via secure video conferencing worldwide.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: OUR OFFICES ── */}
      <section className="py-16 sm:py-20 bg-[#091540] text-white border-t border-white/10">
        <div className="max-w-[1240px] mx-auto px-6">
          <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#8DC63F] block mb-8">
            Our Offices
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {OFFICES.map((off, idx) => (
              <div
                key={idx}
                className="bg-[#2D3A54]/60 border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:bg-[#2D3A54] transition-colors"
              >
                <div>
                  <h3 className="font-[var(--fd)] text-lg font-bold text-white mb-0.5">
                    {off.city},
                  </h3>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8DC63F] block mb-4">
                    {off.state}
                  </span>

                  <div className="text-xs text-white/75 font-light leading-relaxed mb-6 space-y-0.5">
                    {off.address.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${off.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-white/90 hover:text-[#8DC63F] inline-flex items-center gap-1 transition-colors"
                >
                  Get Directions →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}