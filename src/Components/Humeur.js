import React, { useState } from "react";
import search from "../assets/icones/search.png";

const allEmojis = [
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/v5eHKNBqjkz.png",
    label: "détendu",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/-QMIhlwCYdo.png",
    label: "optimiste",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/-Oz0Mt1ODxc.png",
    label: "gai",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/XUxJKsLyvQ4.png",
    label: "fatigué",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/mkXcJ_5Lz42.png",
    label: "motivé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/mkXcJ_5Lz42.png",
    label: "fier",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/Sx4Sy7SMYUb.png",
    label: "seul",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/DYjeWWIP6lV.png",
    label: "pensif",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/2-xshZHrMzJ.png",
    label: "OK",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yR/r/xX0WVa88-tJ.png",
    label: "nostalgique",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/USUgQ58uDx-.png",
    label: "en colère",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/1Se99YgIwLT.png",
    label: "malade",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/QN53TpvKl34.png",
    label: "ravi",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/gXjnOZhx3oz.png",
    label: "épuisé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/KQnfhKFrEJ6.png",
    label: "ému",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/mkXcJ_5Lz42.png",
    label: "confiant",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/8HG4ArhYqqm.png",
    label: "en pleine forme",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/mkXcJ_5Lz42.png",
    label: "très cool",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yR/r/X71Se0IjjoA.png",
    label: "déterminé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/94kyFsW4pl3.png",
    label: "crevé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/USUgQ58uDx-.png",
    label: "ennuyé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/Zq_QZwVGoqX.png",
    label: "content",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/_rhXOH8CsRB.png",
    label: "chanceux",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/uExps4LXYsl.png",
    label: "a le cœur brisé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yo/r/liHnDhve3V-.png",
    label: "ennuyé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/XUxJKsLyvQ4.png",
    label: "endormi",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/QN53TpvKl34.png",
    label: "stimulé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/Puw1zycDBVG.png",
    label: "affamé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/mkXcJ_5Lz42.png",
    label: "professionnel",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/bJLEtuB841O.png",
    label: "peiné",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/v5eHKNBqjkz.png",
    label: "en paix",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/vAd0CBmjF8Y.png",
    label: "déçu",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/mkXcJ_5Lz42.png",
    label: "optimiste",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/j4N2EHLjFcG.png",
    label: "a froid",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/WstlxnuAlJf.png",
    label: "mignon",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/TLm2OJzKubg.png",
    label: "formidable",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/8HG4ArhYqqm.png",
    label: "très bien",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/zNPuI3DdlO0.png",
    label: "désolé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yL/r/ViDymeQ2vS7.png",
    label: "super bien",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/r25QaKZcE9s.png",
    label: "inquiet",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/K11hrTHTyfg.png",
    label: "drôle",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/vAd0CBmjF8Y.png",
    label: "mal",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/Sx4Sy7SMYUb.png",
    label: "déprimé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/Gog0z_oEPLa.png",
    label: "inspiré",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tNYZpPkEnbp.png",
    label: "satisfait(e)",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/mkXcJ_5Lz42.png",
    label: "motivé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/v5eHKNBqjkz.png",
    label: "calme",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/hAjN0l2I0-y.png",
    label: "confus",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/ni4Armmrf3P.png",
    label: "niais",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/DYkNJ0ffgWK.png",
    label: "oublié",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tNYZpPkEnbp.png",
    label: "bien",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/ya/r/EsVCKErmClv.png",
    label: "sarcastique",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/vAd0CBmjF8Y.png",
    label: "seul",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yL/r/ViDymeQ2vS7.png",
    label: "fort",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/fFaSv61BiCy.png",
    label: "inquiet",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yV/r/gGmEl_0Q-iL.png",
    label: "spécial",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/Sx4Sy7SMYUb.png",
    label: "déprimé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yf/r/7eo15DE44--.png",
    label: "gai",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/Gog0z_oEPLa.png",
    label: "curieux",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/vAd0CBmjF8Y.png",
    label: "faible",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tNYZpPkEnbp.png",
    label: "bienvenu",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/hBlmNHlPwyJ.png",
    label: "cassé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/BVe1f0GjDgS.png",
    label: "beau",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yV/r/gGmEl_0Q-iL.png",
    label: "incroyablement bien",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/GhRDii4zrL4.png",
    label: "irrité",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/vAd0CBmjF8Y.png",
    label: "stressé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/b0uai6DkBKW.png",
    label: "incomplet",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/ni4Armmrf3P.png",
    label: "hyper bien",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/3toQEDxYsXi.png",
    label: "coquin",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/QN53TpvKl34.png",
    label: "stupéfait",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/USUgQ58uDx-.png",
    label: "très fâché",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/bJLEtuB841O.png",
    label: "en a marre",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yf/r/6Lnq4sgFwNe.png",
    label: "perplexe",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/plwtt5-3_s7.png",
    label: "furieux",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/USUgQ58uDx-.png",
    label: "très en colère",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tNYZpPkEnbp.png",
    label: "rafraîchi",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/3toQEDxYsXi.png",
    label: "accompli",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/koNZzuTQDOP.png",
    label: "surpris",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yf/r/6Lnq4sgFwNe.png",
    label: "perplexe",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/vAd0CBmjF8Y.png",
    label: "frustré",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/nrz0teaAY94.png",
    label: "incertain",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/WstlxnuAlJf.png",
    label: "beau",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/Zq_QZwVGoqX.png",
    label: "mieux",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/vAd0CBmjF8Y.png",
    label: "coupable",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/vTeCt9V__aX.png",
    label: "en sécurité",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tNYZpPkEnbp.png",
    label: "libre",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/hAjN0l2I0-y.png",
    label: "perdu",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yh/r/zqvH3Bm-BsF.png",
    label: "vieux",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/v5eHKNBqjkz.png",
    label: "fainéant",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/vAd0CBmjF8Y.png",
    label: "pire",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/USUgQ58uDx-.png",
    label: "horriblement mal",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tNYZpPkEnbp.png",
    label: "confortablement bien",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/XUxJKsLyvQ4.png",
    label: "stupide",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/zNPuI3DdlO0.png",
    label: "a honte",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/Sx4Sy7SMYUb.png",
    label: "terriblement mal",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/XUxJKsLyvQ4.png",
    label: "endormie",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tNYZpPkEnbp.png",
    label: "bien",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tNYZpPkEnbp.png",
    label: "vivant",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/WstlxnuAlJf.png",
    label: "timide",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yR/r/f920MfleIcI.png",
    label: "dur",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/qOniWzNSEHP.png",
    label: "bizarre",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tNYZpPkEnbp.png",
    label: "humain",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/bJLEtuB841O.png",
    label: "blessé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/7a10cYmnbZn.png",
    label: "affreusement mal",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/Zq_QZwVGoqX.png",
    label: "normal",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/vm_19q6gADx.png",
    label: "a chaud",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/nrz0teaAY94.png",
    label: "sans assurance",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/XUxJKsLyvQ4.png",
    label: "faible",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/Zq_QZwVGoqX.png",
    label: "gentil",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/Zq_QZwVGoqX.png",
    label: "bien",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/XUxJKsLyvQ4.png",
    label: "stupide",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tNYZpPkEnbp.png",
    label: "bien",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/3toQEDxYsXi.png",
    label: "important",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/7a10cYmnbZn.png",
    label: "pas terrible",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/vAd0CBmjF8Y.png",
    label: "pas confortable",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/XUxJKsLyvQ4.png",
    label: "inutile",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/mkXcJ_5Lz42.png",
    label: "prêt",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/K11hrTHTyfg.png",
    label: "différent",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/vAd0CBmjF8Y.png",
    label: "impuissant",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/nrz0teaAY94.png",
    label: "étrange",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/4Gr0W7Gyo02.png",
    label: "saoul",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/Hug6hCcvXt_.png",
    label: "bouleversé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/vAd0CBmjF8Y.png",
    label: "désespéré",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tNYZpPkEnbp.png",
    label: "entier",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/USUgQ58uDx-.png",
    label: "misérable",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/USUgQ58uDx-.png",
    label: "fou",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tNYZpPkEnbp.png",
    label: "profond",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/7a10cYmnbZn.png",
    label: "nul",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/vAd0CBmjF8Y.png",
    label: "nerveux",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/VzlqZoIu0jx.png",
    label: "a le cafard",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tNYZpPkEnbp.png",
    label: "convoité",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/Zq_QZwVGoqX.png",
    label: "honoré",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tNYZpPkEnbp.png",
    label: "léger",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/7a10cYmnbZn.png",
    label: "a la gueule de bois",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/vTeCt9V__aX.png",
    label: "sûr",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/4E288lReLaT.png",
    label: "nu",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/_XMc_VgqmiB.png",
    label: "sale",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/XUxJKsLyvQ4.png",
    label: "futile",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/8HG4ArhYqqm.png",
    label: "merveilleux",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/Dxg7LlsBAFd.png",
    label: "apeuré",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/plwtt5-3_s7.png",
    label: "jaloux",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/bJLEtuB841O.png",
    label: "vexé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/XUxJKsLyvQ4.png",
    label: "repoussé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/mkXcJ_5Lz42.png",
    label: "apprécié",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/tNYZpPkEnbp.png",
    label: "rassasié",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/nrz0teaAY94.png",
    label: "occupé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/Bd7HCEX2uJ4.png",
    label: "petit",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/uExps4LXYsl.png",
    label: "mal aimé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/Sx4Sy7SMYUb.png",
    label: "inutile",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/3toQEDxYsXi.png",
    label: "qualifié",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/GulyrspGCCK.png",
    label: "a le cafard",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yo/r/liHnDhve3V-.png",
    label: "impatient",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/xc9LQV_j3yr.png",
    label: "privilégié",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yM/r/TqCq4cbifvz.png",
    label: "pris au piège",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/7a10cYmnbZn.png",
    label: "a soif",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/1Se99YgIwLT.png",
    label: "a la nausée",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/vAd0CBmjF8Y.png",
    label: "fâché",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/USUgQ58uDx-.png",
    label: "offensé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/j4N2EHLjFcG.png",
    label: "engourdi",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yV/r/gGmEl_0Q-iL.png",
    label: "parfait",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/DYjeWWIP6lV.png",
    label: "défié",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/94kyFsW4pl3.png",
    label: "menacé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yf/r/DxnxXXkYiSX.png",
    label: "soulagé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/gXjnOZhx3oz.png",
    label: "coincé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/qOniWzNSEHP.png",
    label: "bizarre",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/WstlxnuAlJf.png",
    label: "embarrassé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/v5eHKNBqjkz.png",
    label: "reposé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yL/r/xOjVJ2q9bEF.png",
    label: "intelligent",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/vAd0CBmjF8Y.png",
    label: "trahi",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/vAd0CBmjF8Y.png",
    label: "trahi",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/94kyFsW4pl3.png",
    label: "anxieux",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/USUgQ58uDx-.png",
    label: "exaspéré",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/USUgQ58uDx-.png",
    label: "machiavélique",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/XUxJKsLyvQ4.png",
    label: "ignoré",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/XUxJKsLyvQ4.png",
    label: "regrette",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yl/r/-Oz0Mt1ODxc.png",
    label: "en bonne santé",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/Zq_QZwVGoqX.png",
    label: "généreux",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/6Nc6PBM5UGj.png",
    label: "riche",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/Hug6hCcvXt_.png",
    label: "a peur",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/HwQfWk1cyVc.png",
    label: "fauché",
  },
  {
    lien: "https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/hAjN0l2I0-y.png",
    label: "invisible",
  },
];

function Humeur({ setModalHumeur, setValueModal }) {
  const [emojis, setEmojis] = useState(allEmojis);

  const handleclic = (emoji) => {
    setModalHumeur([emoji]);
    setValueModal("");
  };

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const filteredEmojis = allEmojis.filter(function (emoji) {
      return emoji.label.toLowerCase().includes(searchTerm);
    });

    setEmojis(filteredEmojis);
  };

  return (
    <div style={{ padding: "0 15px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 0",
          borderBottom: "1px solid #e5e5e5",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#e4e6eb",
            display: "flex",
            alignItems: "center",
            borderRadius: "100%",
            padding: "9px",
          }}
          onClick={() => setValueModal("")}
        >
          <i
            style={{
              backgroundImage:
                "url('https://static.xx.fbcdn.net/rsrc.php/v3/ym/r/rQp6okZNzWW.png')",
              backgroundPosition: "-25px -59px",
              backgroundSize: "auto",
              width: "20px",
              height: "20px",
              backgroundRepeat: "no-repeat",
              display: "inline-block",
            }}
          />
        </div>
        <h3 style={{ textAlign: "center" }}>Comment allez-vous ?</h3>
        <aside></aside>
      </div>
      <div>
        <div style={{ margin: "20px 0" }}>
          <span
            style={{ color: "#1876f2", fontWeight: "bold", fontSize: "14px" }}
          >
            Emotions
          </span>
        </div>
        <div
          style={{
            width: "80%",
            backgroundColor: "#e4e6eb",
            height: "35px",
            borderRadius: "100px",
            display: "flex",
            alignItems: "center",
            padding: " 0 13px",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <img src={search} style={{ width: "18px" }} />
          <input
            placeholder="Rechercher"
            onChange={handleChange}
            style={{
              height: "50%",
              backgroundColor: "#e4e6eb",
              border: "none",
              fontSize: "16px",
              width: "100%",
            }}
          />
        </div>
      </div>
      <div style={{ width: "100%", height: "500px", overflow: "scroll" }}>
        <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
          {emojis.map((emoji, index) => (
            <div
              key={index}
              style={{
                width: "250px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "15px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  backgroundColor: "#e4e6eb",
                  display: "flex",
                  alignItems: "center",
                  padding: "7px",
                  borderRadius: "100%",
                }}
              >
                <img
                  style={{ width: "23px", height: "23px" }}
                  src={emoji.lien}
                />
              </div>

              <label
                key={index}
                style={{ fontSize: "15px" }}
                onClick={() => handleclic(emoji)}
              >
                {emoji.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Humeur;
