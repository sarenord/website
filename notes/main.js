var t = document.getElementsByClassName("tabcontent"),
  e = document.getElementsByClassName("tablink"),
  n = document.getElementById("tab_help");

function i(e) {
  for (let e of t) e.style.display = "none";
  document.getElementById("tab_" + e).style.display = "block";
  var n = document.getElementsByClassName("tablink");
  for (let t of n) t.style.backgroundColor = "";
  document.getElementById("tablink_" + e).style.backgroundColor = "#666"
}

function s(t) {
  var e = t.target.id;
  e && i(e.split("_")[1])
}

function o(t) {
  let e = [0, 0, 0, 0, 0, 0],
    n = 0;
  for (let s of t.childNodes) {
    if (!s.tagName) continue;
    let t = s.tagName.toUpperCase();
    if ("H" != t[0] || 2 != t.length) continue;
    let o = parseInt(t[1]) - 1;
    if (e[o] += 1, o < n)
      for (var i = o + 1; i < e.length; ++i) e[i] = 0;
    n = o;
    let a = "";
    for (i = 1; i < e.length && 0 != e[i]; ++i) "" != a && (a += "."), a += e[i];
    s.textContent = a + " " + s.textContent
  }
  let s = [];
  for (let e of t.childNodes) e.tagName && "H2" == e.tagName.toUpperCase() && s.push(e);
  for (i = 1; i < s.length; ++i) {
    let e = document.createElement("hr");
    t.insertBefore(e, s[i])
  }
}
for (let t of e) t.addEventListener("click", s);

function a(t, e) {
  this.div = document.createElement("div"), this.div.className = "dialog";
  let n = document.createElement("div");
  n.className = "dialog_title", n.appendChild(document.createTextNode(t)), this.div.appendChild(n), this.div.appendChild(e), this.bgDiv = document.createElement("div"), this.bgDiv.className = "overlay", this.bgDiv.onclick = function(t) {
    this.close(), t.stopPropagation()
  }.bind(this);
  var i = document.getElementsByTagName("body")[0];
  i.appendChild(this.div), i.appendChild(this.bgDiv), this.keyHandler = function(t) {
    for (let e of this.keyListeners) e(t.key);
    "Escape" === t.key && this.close()
  }.bind(this), i.addEventListener("keydown", this.keyHandler), this.closeListeners = [], this.keyListeners = []
}

function r(t, e) {
  if (e || (e = "assertion failed"), !t) throw e
}

function l(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t)
}

function d(t, e) {
  return t.getAttributeNS(null, e)
}

function h(t, e, n) {
  t.setAttributeNS(null, e, n)
}

function c() {
  return -1 != navigator.userAgent.indexOf("Win")
}
i("edit"), o(n), a.prototype.addCloseListener = function(t) {
  this.closeListeners.push(t)
}, a.prototype.addKeyListener = function(t) {
  this.keyListeners.push(t)
}, a.prototype.close = function() {
  var t = document.getElementsByTagName("body")[0];
  if (t.contains(this.div)) {
    t.removeChild(this.div), t.removeChild(this.bgDiv), t.removeEventListener("keydown", this.keyHandler);
    for (let t of this.closeListeners) t()
  }
};
let p = document.getElementById("btn_login"),
  u = document.getElementById("btn_user");

function m() {
  localStorage.removeItem("username"), localStorage.removeItem("userId"), localStorage.removeItem("sessionId"), p.style.display = "block", u.style.display = "none"
}
async function f() {
  let t = localStorage.getItem("userId"),
    e = localStorage.getItem("sessionId");
  if (t) return [t, e];
  let [n, i] = await g();
  return [t, e] = await y(n, i), p.style.display = "none", u.style.display = "block", u.textContent = n, localStorage.setItem("username", n), localStorage.setItem("userId", t), localStorage.setItem("sessionId", e), [t, e]
}
async function y(t, e) {
  return new Promise((n, i) => {
    let s = JSON.stringify({
      username: t,
      password: e
    });
    var o = new XMLHttpRequest;
    o.open("POST", "login", !0), o.setRequestHeader("Content-Type", "application/json"), o.onreadystatechange = function() {
      if (4 == this.readyState && 200 == this.status) {
        var t = JSON.parse(this.responseText);
        n([t.userId, t.sessionId])
      }
      4 == this.readyState && 400 == this.status && i()
    }, o.send(s)
  })
}
async function g() {
  var t = document.createElement("div"),
    e = new a("Log In", t),
    n = document.createElement("a");
  n.className = "form_link", n.textContent = "Register / Create New Account", t.appendChild(n), (s = document.createElement("div")).className = "form_div";
  let i = document.createElement("input");
  var s;
  i.type = "text", i.size = 16, i.maxLength = 16, s.appendChild(document.createTextNode("Username ")), s.appendChild(i), t.appendChild(s), (s = document.createElement("div")).className = "form_div";
  let o = document.createElement("input");
  o.type = "password", o.size = 16, o.maxLength = 16, s.appendChild(document.createTextNode("Password ")), s.appendChild(o), t.appendChild(s);
  var r = document.createElement("button");
  return r.className = "form_btn", r.appendChild(document.createTextNode("Log in")), t.appendChild(r), new Promise((t, s) => {
    n.onclick = async function() {
      e.close();
      let [n, i] = await v();
      t([n, i])
    }, r.onclick = function() {
      let n = i.value,
        s = o.value;
      e.close(), t([n, s])
    }
  })
}
async function v() {
  let [t, e, n] = await x();
  await b(t, e, n);
  return [t, e]
}
async function b(t, e, n) {
  return new Promise((i, s) => {
    let o = JSON.stringify({
      username: t,
      password: e,
      email: n
    });
    var a = new XMLHttpRequest;
    a.open("POST", "register", !0), a.setRequestHeader("Content-Type", "application/json"), a.onreadystatechange = function() {
      if (4 == this.readyState && 200 == this.status) {
        JSON.parse(this.responseText);
        i(!0)
      }
      4 == this.readyState && 400 == this.status && s()
    }, a.send(o)
  })
}
async function x() {
  var t = document.createElement("div"),
    e = new a("Create New Account", t);
  (o = document.createElement("div")).className = "form_div";
  let n = document.createElement("input");
  n.type = "text", n.size = 16, n.maxlength = 16, o.appendChild(document.createTextNode("Username ")), o.appendChild(n), t.appendChild(o), (o = document.createElement("div")).className = "form_div";
  let i = document.createElement("input");
  i.type = "password", i.size = 16, i.maxLength = 16, o.appendChild(document.createTextNode("Password ")), o.appendChild(i), t.appendChild(o), (o = document.createElement("div")).className = "form_div";
  let s = document.createElement("input");
  var o;
  s.type = "password", s.size = 16, s.maxLength = 16, o.appendChild(document.createTextNode("Confirm password ")), o.appendChild(s), t.appendChild(o), (o = document.createElement("div")).className = "form_div";
  let r = document.createElement("input");
  r.type = "text", r.size = 30, r.maxLength = 30, o.appendChild(document.createTextNode("E-mail (optional) ")), o.appendChild(r), t.appendChild(o);
  var l = document.createElement("div");
  l.className = "form_error", t.appendChild(l);
  var d = document.createElement("button");
  return d.className = "form_btn", d.appendChild(document.createTextNode("Register")), t.appendChild(d), n.onchange = function() {
    let t = n.value;
    return t.trim() !== t ? (l.textContent = "Invalid username", l.style.display = "block", void(d.disabled = !0)) : 0 == t.length ? (l.textContent = "Username too short", l.style.display = "block", void(d.disabled = !0)) : (l.style.display = "none", void(d.disabled = !1))
  }, s.onchange = function() {
    let t = i.value;
    return t != s.value ? (l.textContent = "Passwords do not match", l.style.display = "block", void(d.disabled = !0)) : t.length < 6 ? (l.textContent = "Password must be at least 6 characters", l.style.display = "block", void(d.disabled = !0)) : (l.style.display = "none", void(d.disabled = !1))
  }, new Promise((t, o) => {
    d.onclick = function() {
      let o = n.value,
        a = i.value,
        l = s.value,
        d = r.value;
      a == l && (e.close(), t([o, a, d]))
    }
  })
}

function w() {
  let t = localStorage.getItem("username");
  t && (p.style.display = "none", u.style.display = "block", u.textContent = t)
}
var C, k, N;

function I() {
  return C ? N : (!0 === window.hasOwnProperty("AudioContext") ? C = new AudioContext : !0 === window.hasOwnProperty("webkitAudioContext") && (C = new webkitAudioContext), N = C.sampleRate)
}

function E(t) {
  r(C, "audio context not initialized"), C.resume(), void 0 !== k && D();
  let e = c() ? 2048 : 1024;
  (k = C.createScriptProcessor(e, 0, 2)).onaudioprocess = function(e) {
    e.inputBuffer;
    var n = e.outputBuffer;
    r(2 == n.numberOfChannels);
    var i = n.getChannelData(0),
      s = n.getChannelData(1);
    t(i, s)
  }, k.connect(C.destination)
}

function D() {
  void 0 !== C && void 0 !== k && (k.disconnect(), k.onaudioprocess = void 0, k = void 0)
}
p.onclick = f, u.onclick = m, w();
let S = document.getElementById("btn_new"),
  T = document.getElementById("project_title");
var M = document.getElementById("share_title"),
  P = document.getElementById("share_agree"),
  _ = document.getElementById("share_error_title"),
  L = document.getElementById("share_error_agree"),
  O = document.getElementById("share_btn"),
  A = document.getElementById("share_url_div"),
  B = document.getElementById("share_url"),
  V = document.getElementById("browse_div"),
  j = {};

function q(t) {
  T.value = t, M.value = t, window.document.title = (Kt() ? "▶ " : "") + t + " - Zupiter Alpha"
}

function F(t, e) {
  var n = new XMLHttpRequest;
  n.open("GET", "browse/" + e, !0), n.setRequestHeader("Content-Type", "application/json"), n.onreadystatechange = function() {
    if (4 == this.readyState && 200 == this.status) {
      for (var n = Date.now(), s = JSON.parse(this.responseText), o = 0; o < s.length; ++o) {
        let e = s[o],
          u = e.id;
        if (!(u in j) && !(e.title.startsWith("NS ") && "feren_isles" != localStorage.getItem("username") && "Max" != localStorage.getItem("username") || "feren_isles" == e.username && "feren_isles" != localStorage.getItem("username") && "Max" != localStorage.getItem("username"))) {
          j[u] = !0;
          var a = document.createElement("div");
          a.appendChild(document.createTextNode(u + ". "));
          var r = document.createElement("a");
          r.href = "#" + u, r.appendChild(document.createTextNode(e.title)), a.appendChild(r), r.onclick = function() {
            u == window.location.hash.substr(1) && i("edit")
          }, a.appendChild(document.createTextNode(" by ")), a.appendChild(document.createTextNode(e.username));
          var l, d = Math.max((n - e.submit_time) / 1e3, 0),
            h = Math.floor(d / 60),
            c = Math.floor(h / 60),
            p = Math.floor(c / 24);
          l = 1 == p ? "yesterday" : p > 1 ? p + " days ago" : 1 == c ? "1 hour ago" : c > 1 ? c + " hours ago" : h > 1 ? h + " mins ago" : "now", a.appendChild(document.createTextNode(" (" + l + ")")), t.appendChild(a)
        }
      }
      s.length > 0 && R(e + s.length)
    }
  }, n.send()
}

function R(t, e) {
  var n = document.createElement("div");

  function e() {
    var i = n.getBoundingClientRect(),
      s = i.top,
      o = i.bottom;
    s < window.innerHeight && o > 0 && (F(n, t), window.removeEventListener("scroll", e))
  }
  V.appendChild(n), window.addEventListener("scroll", e), e()
}

function G(t) {
  var e = "get_project/" + t,
    n = new XMLHttpRequest;
  n.open("GET", e, !0), n.setRequestHeader("Content-Type", "application/json"), n.onreadystatechange = function() {
    if (4 == this.readyState && 200 == this.status) {
      var e = JSON.parse(this.responseText);
      q(e.title), Ut(e.data), window.location.hash = t
    }
  }, n.send()
}

function H(t) {
  window.location.hash && G(window.location.hash.substr(1))
}
S.addEventListener("click", (function() {
  q("Untitled Project"), _.style.display = "none", L.style.display = "none"
})), O.onclick = async function() {
  var t = M.value;
  if (!t || t.toLowerCase().includes("untitled")) return void(_.style.display = "block");
  if (!P.checked) return void(L.style.display = "block");
  let [e, n] = await f();
  P.checked = !1, _.style.display = "none", L.style.display = "none";
  var i = {
      userId: e,
      sessionId: n,
      title: t,
      data: Jt()
    },
    s = JSON.stringify(i),
    o = new XMLHttpRequest;
  o.open("POST", "share", !0), o.setRequestHeader("Content-Type", "application/json"), o.onreadystatechange = function() {
    if (4 == this.readyState && 200 == this.status) {
      var t = JSON.parse(this.responseText).projectId,
        e = window.location.href.split("#")[0] + "#" + t;
      A.style.display = "flex", B.value = e, window.history.replaceState({}, "", e)
    }
  }, o.send(s), O.disabled = !0, setTimeout((function() {
    O.disabled = !1
  }), 8e3)
}, T.onchange = function() {
  q(T.value)
}, M.onchange = function() {
  q(M.value)
}, tablink_share.addEventListener("click", (function() {
  A.style.display = "none"
})), tablink_browse.addEventListener("click", (function() {
  for (; V.firstChild;) V.removeChild(V.firstChild);
  j = {}, R(0)
})), window.addEventListener("hashchange", H), window.addEventListener("load", H);
let z = null,
  K = [];

function U(t) {
  K.push(t)
}

function J(t) {
  K = K.filter(e => e != t)
}

function X(t) {
  if (z)
    for (let e of z.outputs.values()) e.send(t)
}

function W(t) {
  for (var e = 0; e < t.data.length; e++) "0x" + t.data[e].toString(16) + " ";
  for (let e of K) e(t.data)
}

function Y(t) {
  z = t;
  for (let e of t.inputs.values()) e.onmidimessage = W
}

function Z(t) {}

function Q(t, e, n, i) {
  this.minVal = t, this.maxVal = e, this.value = n, this.changeListeners = [], this.bindListeners = [], this.div = document.createElement("div"), this.div.style.padding = "4px", this.div.style["text-align"] = "center";
  var s = document.createElement("canvas");

  function o(t) {
    t.preventDefault(), t.stopPropagation(), window.removeEventListener("mousemove", this.mouseMoveHandler), window.removeEventListener("mouseup", this.mouseUpHandler)
  }

  function r(t) {
    let e = this.getNormVal();
    e += -t.movementY / 100, e = Math.min(e, 1), e = Math.max(e, 0), this.setNormVal(e)
  }
  s.width = 30, s.height = 30, this.ctx = s.getContext("2d"), this.ctx.width = s.width, this.ctx.height = s.height, this.div.appendChild(s), this.valDiv = document.createElement("div"), this.valDiv.style["font-size"] = "12px", this.valDiv.style.color = "#BBB", this.valDiv.appendChild(document.createTextNode("1.00")), this.div.appendChild(this.valDiv), this.div.onmousedown = function(t) {
    t.preventDefault(), t.stopPropagation(), this.drawKnob(), this.mouseMoveHandler && (window.removeEventListener("mousemove", this.mouseMoveHandler), window.removeEventListener("mouseup", this.mouseUpHandler)), this.mouseMoveHandler = r.bind(this), this.mouseUpHandler = o.bind(this), window.addEventListener("mousemove", this.mouseMoveHandler), window.addEventListener("mouseup", this.mouseUpHandler)
  }.bind(this), this.div.ondblclick = function(t) {
    t.stopPropagation();
    var e = document.createElement("div"),
      n = new a("MIDI Control Mapping", e);
    e.appendChild(document.createTextNode("Move a knob or fader on your MIDI controller to map the control to this knob. Note that the MIDI controller should be connected before Zupiter is loaded. Press escape to unmap the knob."));
    let i = this;

    function s(t) {
      if (176 == (240 & t[0]) && 3 == t.length) {
        let e = t[1];
        n.close(), i.bindMidi(e), J(s)
      }
    }
    U(s), n.addCloseListener((function(t) {
      i.bindMidi(null), J(s)
    }))
  }.bind(this), i && this.bindMidi(i), this.drawKnob()
}
"requestMIDIAccess" in navigator && navigator.requestMIDIAccess({
  sysex: !1
}).then(Y, Z), Q.prototype.addChangeListener = function(t) {
  this.changeListeners.push(t)
}, Q.prototype.addBindListener = function(t) {
  this.bindListeners.push(t)
}, Q.prototype.getNormVal = function() {
  var t = this.value,
    e = this.minVal,
    n = this.maxVal;
  return e == n ? e : (t - e) / (n - e)
}, Q.prototype.setNormVal = function(t) {
  this.value = this.minVal + t * (this.maxVal - this.minVal);
  for (let t of this.changeListeners) t(this.value);
  this.drawKnob()
}, Q.prototype.bindMidi = function(t) {
  this.listener && J(this.listener), null !== t && (this.controlNo = t, this.listener = function(t) {
    if (176 != (240 & t[0]) || 3 != t.length) return;
    let e = t[1],
      n = t[2];
    if (e != this.controlNo) return;
    let i = n / 127;
    this.setNormVal(i)
  }.bind(this), U(this.listener));
  for (let e of this.bindListeners) e(t)
}, Q.prototype.drawKnob = function() {
  var t = this.value,
    e = this.minVal,
    n = this.maxVal,
    i = 280 * ((t - e) / (n - e)) - 140,
    s = this.ctx,
    o = s.width / 2,
    a = s.height / 2,
    r = .4 * s.width;
  s.clearRect(0, 0, s.width, s.height), s.save(), s.translate(o, a), s.rotate(i * Math.PI / 180), s.beginPath(), s.arc(0, 0, r, 0, 2 * Math.PI, !1), s.fillStyle = "#555", s.fill(), s.beginPath(), s.moveTo(0, 0), s.lineTo(0, -r), s.strokeStyle = "#FFF", s.lineWidth = 1.6, s.stroke(), s.restore();
  let l = Math.max(Math.abs(e), Math.abs(n)),
    d = Math.floor(Math.log10(l)),
    h = Math.max(0, 2 - Math.max(0, d)),
    c = t.toFixed(h);
  e < 0 && t >= 0 && (c = "+" + c), this.valDiv.textContent = c
};
const $ = 24,
  tt = $ / 4,
  et = 128,
  nt = 12,
  it = 1200,
  st = 440,
  ot = 69,
  at = {
    C: 0,
    "C#": 1,
    D: 2,
    "D#": 3,
    E: 4,
    F: 5,
    "F#": 6,
    G: 7,
    "G#": 8,
    A: 9,
    "A#": 10,
    B: 11
  },
  rt = {
    0: "C",
    1: "C#",
    2: "D",
    3: "D#",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "G#",
    9: "A",
    10: "A#",
    11: "B"
  };

function lt(t) {
  if ("string" == typeof t && (t = lt.nameToNo(t)), r("number" == typeof t, "invalid note number"), void 0 !== lt.notesByNo[t]) return lt.notesByNo[t];
  var e = Object.create(lt.prototype);
  return e.noteNo = t, lt.notesByNo[t] = e, e
}
lt.notesByNo = [], lt.nameToNo = function(t) {
  var e = t.match(/([A-G]#?)([0-9])/i);
  r(null !== e, 'invalid note name: "' + t + '"');
  var n = e[1],
    i = e[2],
    s = at[n];
  r("number" == typeof s, "invalid note name: " + n);
  var o = (parseInt(i) + 1) * nt + s;
  return r(o >= 0 || o < 128, "note parsing failed"), o
}, lt.sortFn = function(t, e) {
  return t.noteNo - e.noteNo
}, lt.prototype.getPC = function() {
  return this.noteNo % nt
}, lt.prototype.getOctNo = function() {
  return Math.floor(this.noteNo / nt) - 1
}, lt.prototype.getName = function() {
  var t = this.getOctNo(),
    e = this.getPC(),
    n = rt[e];
  return n += String(t)
}, lt.prototype.toString = lt.prototype.getName, lt.prototype.getFreq = function(t) {
  void 0 === t && (t = 0);
  var e = (this.noteNo - 69) / nt,
    n = t / 1200;
  return 440 * Math.pow(2, e + n)
}, lt.prototype.offset = function(t) {
  var e = this.noteNo + t;
  return r(e >= 0 && e < 128, "invalid note number after offset"), new lt(e)
}, lt.prototype.shift = function(t) {
  return this.offset(t * nt)
};
var dt = {
  major: [2, 2, 1, 2, 2, 2],
  "natural minor": [2, 1, 2, 2, 1, 2],
  "harmonic minor": [2, 1, 2, 2, 1, 3],
  "major pentatonic": [2, 2, 3, 2],
  "minor pentatonic": [3, 2, 2, 3],
  blues: [3, 2, 1, 1, 3],
  chromatic: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
};
const ht = Object.keys(dt);

function ct(t, e, n) {
  t instanceof lt == !1 && (t = new lt(t)), void 0 === n && (n = 1);
  var i = dt[e];
  r(i instanceof Array, "invalid scale name: " + e);
  for (var s = [], o = 0; o < n; ++o) {
    var a = t.shift(o);
    s.push(a);
    for (var l = 0; l < i.length; ++l) {
      var d = s[s.length - 1],
        h = i[l];
      s.push(d.offset(h))
    }
  }
  return s.push(t.shift(n)), s
}

function pt(t, e) {
  wt.call(this, t, e), this.octNo = 3, this.freq = 0, this.gate = 0, this.key = null, this.lightDiv = document.createElement("div"), this.lightDiv.style.width = 6, this.lightDiv.style.height = 6, this.lightDiv.style.background = "#333", this.lightDiv.style["margin-top"] = 6, this.centerDiv.appendChild(this.lightDiv), this.attachKeyboard(), this.attachMidi()
}

function ut(t, e, n) {
  return t * e % 1 < n ? -1 : 1
}

function mt(t, e) {
  e = Math.min(Math.max(e, 0), 1);
  var n = 2 * (e -= .01) / (1 - e);
  return (1 + n) * t / (1 + n * Math.abs(t))
}

function ft(t, e, n) {
  return t >= 1 ? n : e + t * (n - e)
}

function yt() {
  this.state = "off", this.startTime = 0, this.startVal = 0
}

function gt() {
  this.s0 = 0, this.s1 = 0
}

function vt() {
  this.buffer = new Float32Array(44100 * vt.MAX_TIME), this.writeIdx = 0
}
pt.prototype = Object.create(wt.prototype), pt.prototype.attachKeyboard = function() {
  window.addEventListener("keydown", function(t) {
    if (t.srcElement && "input" == t.srcElement.nodeName.toLowerCase()) return;
    let e = null;
    switch (t.key.toUpperCase()) {
      case "Z":
        return void(this.octNo = Math.max(0, this.octNo - 1));
      case "X":
        return void(this.octNo = Math.min(6, this.octNo + 1));
      case "A":
        e = "C0";
        break;
      case "S":
        e = "D0";
        break;
      case "D":
        e = "E0";
        break;
      case "F":
        e = "F0";
        break;
      case "G":
        e = "G0";
        break;
      case "H":
        e = "A0";
        break;
      case "J":
        e = "B0";
        break;
      case "K":
        e = "C1";
        break;
      case "L":
        e = "D1";
        break;
      case "W":
        e = "C#0";
        break;
      case "E":
        e = "D#0";
        break;
      case "T":
        e = "F#0";
        break;
      case "Y":
        e = "G#0";
        break;
      case "U":
        e = "A#0";
        break;
      case "O":
        e = "C#1"
    }
    e && this.key != t.key && (this.freq = lt(e).shift(this.octNo).getFreq(), this.gate = 1, this.key = t.key, this.lightDiv.style.background = "#F00", r("number" == typeof this.freq))
  }.bind(this)), window.addEventListener("keyup", function(t) {
    t.key == this.key && (this.gate = 0, this.key = null, this.lightDiv.style.background = "#333")
  }.bind(this))
}, pt.prototype.attachMidi = function() {
  U(function(t) {
    var e = 240 & t[0];
    if (144 == e && 3 == t.length) {
      let e = t[1],
        n = t[2];
      return 0 == n && e == this.key ? (this.gate = 0, this.key = null, void(this.lightDiv.style.background = "#333")) : n > 0 && this.key != e ? (this.freq = lt(e).getFreq(), this.gate = 1, this.key = e, this.lightDiv.style.background = "#F00", void r("number" == typeof this.freq)) : void 0
    }
    if (128 != e || 3 != t.length);
    else {
      t[1] == this.key && (this.gate = 0, this.key = null, this.lightDiv.style.background = "#333")
    }
  }.bind(this))
}, yt.prototype.reset = function() {
  yt.call(this)
}, yt.prototype.eval = function(t, e, n, i, s, o) {
  switch (this.state) {
    case "off":
      return e > 0 && (this.state = "attack", this.startTime = t, this.startVal = 0), 0;
    case "attack": {
      let e = t - this.startTime;
      return e > n ? (this.state = "decay", this.startTime = t, 1) : ft(e / n, this.startVal, 1)
    }
    case "decay": {
      let n = t - this.startTime,
        o = ft(n / i, 1, s);
      return e <= 0 ? (this.state = "release", this.startTime = t, this.startVal = o, o) : n > i ? (this.state = "sustain", this.startTime = t, s) : o
    }
    case "sustain":
      return e <= 0 && (this.state = "release", this.startTime = t, this.startVal = s), s;
    case "release": {
      let n = t - this.startTime;
      if (n > o) return this.state = "off", 0;
      let i = ft(n / o, this.startVal, 0);
      return e > 0 && (this.state = "attack", this.startTime = t, this.startVal = i), i
    }
  }
  throw "invalid envelope state"
}, gt.prototype.apply = function(t, e, n) {
  r(!isNaN(t), "NaN value fed in TwoPoleFilter"), e = Math.min(e, 1), n = Math.max(n, 0);
  var i = Math.pow(.5, (1 - e) / .125),
    s = 1 - Math.pow(.5, (n + .125) / .125) * i,
    o = this.s0,
    a = this.s1;
  return t = a = s * a + i * (o = s * o - i * a + i * t), this.s0 = o, this.s1 = a, t
}, vt.MAX_TIME = 10, vt.prototype.reset = function() {
  this.buffer.fill(0), this.writeIdx = 0
}, vt.prototype.write = function(t) {
  this.writeIdx = (this.writeIdx + 1) % this.buffer.length, this.buffer[this.writeIdx] = t
}, vt.prototype.read = function(t, e) {
  let n = Math.floor(e * t);
  n >= this.buffer.length && (n = this.buffer.length - 1);
  let i = this.writeIdx - n;
  return i < 0 && (i += this.buffer.length), this.buffer[i]
};
const bt = {
  Add: {
    ins: [{
      name: "in0",
      default: 0
    }, {
      name: "in1",
      default: 0
    }],
    outs: ["out"],
    params: [],
    descr: "add input waveforms"
  },
  ADSR: {
    ctor: Ct,
    ins: [{
      name: "gate",
      default: 0
    }, {
      name: "att",
      default: .02
    }, {
      name: "dec",
      default: .1
    }, {
      name: "sus",
      default: .2
    }, {
      name: "rel",
      default: .1
    }],
    outs: ["out"],
    params: [],
    descr: "ADSR envelope generator"
  },
  AudioOut: {
    ins: [{
      name: "left",
      default: 0
    }, {
      name: "right",
      default: 0
    }],
    outs: [],
    params: [],
    descr: "stereo sound output"
  },
  Clock: {
    ctor: Et,
    ins: [],
    outs: [""],
    params: [{
      name: "value",
      default: 120
    }, {
      name: "minVal",
      default: 60
    }, {
      name: "maxVal",
      default: 240
    }, {
      name: "controlNo",
      default: null
    }],
    descr: "MIDI clock signal source with tempo in BPM"
  },
  ClockOut: {
    ctor: Dt,
    ins: [{
      name: "clock",
      default: 0
    }],
    outs: [],
    params: [],
    descr: "MIDI clock output"
  },
  Const: {
    ctor: It,
    ins: [],
    outs: [""],
    params: [{
      name: "value",
      default: 0
    }],
    descr: "editable constant value"
  },
  Delay: {
    ctor: kt,
    ins: [{
      name: "in",
      default: 0
    }, {
      name: "time",
      default: 0
    }],
    outs: ["out"],
    params: [],
    descr: "delay line"
  },
  delay_read: {
    ins: [{
      name: "time",
      default: 0
    }],
    outs: ["out"],
    params: []
  },
  delay_write: {
    ins: [{
      name: "in",
      default: 0
    }],
    outs: [],
    params: []
  },
  Distort: {
    ins: [{
      name: "in",
      default: 0
    }, {
      name: "amt",
      default: 0
    }],
    outs: ["out"],
    params: [],
    descr: "overdrive-style distortion"
  },
  Div: {
    ins: [{
      name: "in0",
      default: 0
    }, {
      name: "in1",
      default: 1
    }],
    outs: ["out"],
    params: [],
    descr: "divide one input by another"
  },
  Filter: {
    ins: [{
      name: "in",
      default: 0
    }, {
      name: "cutoff",
      default: 1
    }, {
      name: "reso",
      default: 0
    }],
    outs: ["out"],
    params: [],
    descr: "low-pass filter"
  },
  Knob: {
    ctor: Nt,
    ins: [],
    outs: [""],
    params: [{
      name: "value",
      default: 0
    }, {
      name: "minVal",
      default: 0
    }, {
      name: "maxVal",
      default: 1
    }, {
      name: "controlNo",
      default: null
    }],
    descr: "parameter control knob"
  },
  MidiIn: {
    ctor: pt,
    ins: [],
    outs: ["freq", "gate"],
    params: [],
    descr: "MIDI note input (cv/gate)"
  },
  MonoSeq: {
    ctor: Lt,
    ins: [{
      name: "clock",
      default: 0
    }, {
      name: "gateTime",
      default: .1
    }],
    outs: ["freq", "gate"],
    params: [],
    descr: "monophonic step sequencer"
  },
  Mul: {
    ins: [{
      name: "in0",
      default: 1
    }, {
      name: "in1",
      default: 1
    }],
    outs: ["out"],
    params: [],
    descr: "multiply input waveforms"
  },
  Noise: {
    ins: [],
    outs: ["out"],
    params: [],
    descr: "white noise source"
  },
  Notes: {
    ctor: Ot,
    ins: [],
    outs: [],
    params: [],
    descr: "text notes"
  },
  Pulse: {
    ctor: St,
    ins: [{
      name: "freq",
      default: 0
    }, {
      name: "pw",
      default: .5
    }],
    outs: ["out"],
    params: [],
    descr: "pulse/square oscillator"
  },
  Saw: {
    ctor: Tt,
    ins: [{
      name: "freq",
      default: 0
    }],
    outs: ["out"],
    params: [],
    descr: "sawtooth oscillator"
  },
  Scope: {
    ctor: At,
    ins: [{
      name: "",
      default: 0
    }],
    outs: [],
    params: [{
      name: "minVal",
      default: -1
    }, {
      name: "maxVal",
      default: 1
    }],
    descr: "scope to plot incoming signals"
  },
  Sine: {
    ctor: Mt,
    ins: [{
      name: "freq",
      default: 0
    }, {
      name: "sync",
      default: 0
    }],
    outs: ["out"],
    params: [{
      name: "minVal",
      default: -1
    }, {
      name: "maxVal",
      default: 1
    }],
    descr: "sine wave oscillator"
  },
  Slide: {
    ctor: Pt,
    ins: [{
      name: "in",
      default: 0
    }, {
      name: "rate",
      default: 1
    }],
    outs: ["out"],
    params: [],
    descr: "simple slew-rate limiter using a running average"
  },
  Sub: {
    ins: [{
      name: "in0",
      default: 0
    }, {
      name: "in1",
      default: 0
    }],
    outs: ["out"],
    params: [],
    descr: "subtract input waveforms"
  },
  Tri: {
    ctor: _t,
    ins: [{
      name: "freq",
      default: 0
    }],
    outs: ["out"],
    params: [],
    descr: "triangle oscillator"
  }
};

function xt(t, e) {
  this.graph = null, this.nextId = 0, this.nodes = new WeakMap, this.editTab = document.getElementById("tab_edit"), this.div = document.getElementById("graph_div"), this.svg = document.getElementById("graph_svg"), this.bgText = document.getElementById("graph_bg_text"), this.drag = null, this.port = null, this.onGraphChange = function(t, e) {}, this.genDOM()
}

function wt(t, e) {
  let n = bt[e.type];
  for (let t of n.params) t.name in e.params || (e.params[t.name] = t.default);
  this.editor = t, this.data = e, this.type = e.type, this.desc = n, this.numIns = this.desc.ins.length, this.numOuts = this.desc.outs.length, this.nodeDiv = null, this.headerDiv = null, this.centerDiv = null, this.inLines = new Array(this.numIns), this.outLines = new Array(this.numOuts), this.inPorts = new Array(this.numIns), this.outPorts = new Array(this.numOuts);
  for (var i = 0; i < this.outLines.length; ++i) this.outLines[i] = [];
  this.genNodeDOM()
}

function Ct(t, e) {
  wt.call(this, t, e), this.env = new yt
}

function kt(t, e) {
  wt.call(this, t, e), this.delay = new vt
}

function Nt(t, e) {
  wt.call(this, t, e), this.knob = new Q(e.params.minVal, e.params.maxVal, e.params.value, e.params.controlNo), this.centerDiv.append(this.knob.div), this.knob.addChangeListener(t => this.data.params.value = t), this.knob.addBindListener(t => this.data.params.controlNo = t)
}

function It(t, e) {
  wt.call(this, t, e), this.headerDiv.style.display = "none";
  let n = this.input = document.createElement("input");
  n.style["text-align"] = "center", n.style["font-size"] = 14, n.style["font-family"] = "monospace", n.style.color = "#FFF", n.style.background = "none", n.style.border = "none", n.type = "text", n.size = 4, n.maxLength = 12, this.centerDiv.appendChild(n), n.oninput = function() {
    let t = Math.max(2, 1 + n.value.length) + "ch";
    n.style.width = t
  }, n.onchange = function() {
    let t = Number(n.value);
    "" === n.value.trim() || isNaN(t) ? n.value = e.params.value : e.params.value = t;
    let i = Math.max(2, 1 + n.value.length) + "ch";
    n.style.width = i
  }, n.value = e.params.value, n.onchange()
}

function Et(t, e) {
  Nt.call(this, t, e)
}

function Dt(t, e) {
  wt.call(this, t, e), this.clockSgn = 0
}

function St(t, e) {
  wt.call(this, t, e), this.phase = 0
}

function Tt(t, e) {
  wt.call(this, t, e), this.phase = 0
}

function Mt(t, e) {
  wt.call(this, t, e), this.phase = 0, this.syncSgn = !1
}

function Pt(t, e) {
  wt.call(this, t, e), this.s = 0
}

function _t(t, e) {
  wt.call(this, t, e), this.phase = 0
}

function Lt(t, e) {
  wt.call(this, t, e), "patterns" in e || (e.scaleRoot = "C2", e.scaleName = "minor pentatonic", e.numOcts = 1, e.patterns = []);
  var n = document.createElement("div");
  n.style.padding = "4px", n.style["text-align"] = "center", this.centerDiv.append(n);
  let i = document.createElement("div");
  i.style.display = "flex", i.style["justify-content"] = "center", i.style["flex-wrap"] = "nowrap", i.style["margin-bottom"] = 4, n.appendChild(i);
  var s = document.createElement("select"),
    o = document.createElement("select"),
    a = document.createElement("select");
  i.appendChild(s), i.appendChild(o), i.appendChild(a);
  let r = document.createElement("button"),
    l = document.createElement("button"),
    d = document.createElement("button");

  function h() {
    let t = o.options[o.selectedIndex].value,
      e = a.options[a.selectedIndex].value,
      n = s.options[s.selectedIndex].value;
    this.setScale(t, e, n)
  }
  r.appendChild(document.createTextNode("←")), l.appendChild(document.createTextNode("→")), d.appendChild(document.createTextNode("⇒")), i.appendChild(r), i.appendChild(l), i.appendChild(d), r.onclick = t => this.shrink(), l.onclick = t => this.extend(), d.onclick = t => this.extendCopy(), r.ondblclick = t => t.stopPropagation(), l.ondblclick = t => t.stopPropagation(), d.ondblclick = t => t.stopPropagation(), s.onchange = h.bind(this), o.onchange = h.bind(this), a.onchange = h.bind(this);
  for (let t = 1; t <= 3; ++t) {
    (u = document.createElement("option")).setAttribute("value", t), u.appendChild(document.createTextNode(t)), u.selected = t == e.numOcts, s.appendChild(u)
  }
  var c = lt("C1");
  for (let t = 0; t < 5 * nt; ++t) {
    var p = c.getName();
    (u = document.createElement("option")).setAttribute("value", p), u.appendChild(document.createTextNode(p)), u.selected = p == e.scaleRoot, o.appendChild(u), c = c.offset(1)
  }
  for (let t of ht) {
    var u;
    (u = document.createElement("option")).setAttribute("value", t), u.appendChild(document.createTextNode(t)), u.selected = t == e.scaleName, a.appendChild(u)
  }
  this.gridDiv = document.createElement("div"), this.gridDiv.style["margin-top"] = 4, this.gridDiv.style["padding-top"] = 4, this.gridDiv.style["padding-bottom"] = 4, this.gridDiv.style.background = "#111", this.gridDiv.style.border = "1px solid #AAA", this.gridDiv.style["text-align"] = "left", this.gridDiv.style.width = "325", this.gridDiv.style["overflow-x"] = "scroll", this.gridDiv.style["overscroll-behavior-x"] = "none", this.gridDiv.style["white-space"] = "nowrap", n.appendChild(this.gridDiv), this.gridDiv.ondblclick = t => t.stopPropagation(), this.patDivs = [], this.cellDivs = [];
  let m = document.createElement("div");
  m.style.display = "flex", m.style["justify-content"] = "center", m.style["flex-wrap"] = "nowrap", m.style["margin-top"] = 4, n.appendChild(m), this.patBtns = [];
  for (let t = 0; t < 8; ++t) {
    let e = document.createElement("div");
    e.className = "patsel_btn", e.textContent = String(t + 1), e.onclick = e => this.queue(t), m.appendChild(e), this.patBtns.push(e)
  }
  this.scale = ct(e.scaleRoot, e.scaleName, e.numOcts), this.numRows = this.scale.length, this.patIdx = 0, this.resetState()
}

function Ot(t, e) {
  wt.call(this, t, e);
  var n = document.createElement("textarea");
  n.placeholder = "Write notes here.", n.rows = 10, n.cols = 40, n.maxLength = 4e3, n.style.margin = "4px", n.style.resize = "none", n.style.background = "#333", n.style.color = "#FFF", this.centerDiv.append(n), n.onmousedown = t => t.stopPropagation(), n.ondblclick = t => t.stopPropagation(), n.onkeydown = t => t.stopPropagation(), n.oninput = t => e.text = n.value.trimEnd(), "text" in e && (n.value = e.text)
}

function At(t, e) {
  wt.call(this, t, e), this.canvas = document.createElement("canvas"), this.canvas.style.margin = "4px", this.canvas.style.border = "1px solid #888", this.canvas.width = 128, this.canvas.height = 96, this.centerDiv.append(this.canvas), this.ctx = this.canvas.getContext("2d"), this.numSamples = 128, this.windowLen = 1, this.buffer = new Float32Array(this.numSamples), this.writeIdx = 0, this.sampleCount = 0, this.redraw()
}

function Bt(t, e) {
  let n = {
      ...t.nodes
    },
    i = {
      nodes: n
    },
    s = new WeakMap;
  for (let t in n) {
    let i = n[t],
      a = {
        ...i
      };
    a.ins = [...a.ins], a.outs = [...a.outs];
    for (var o = 0; o < a.ins.length; ++o) a.ins[o] = a.ins[o] ? {
      ...a.ins[o]
    } : void 0;
    for (let t = 0; t < a.outs.length; ++t) {
      let e = [...a.outs[t]];
      a.outs[t] = e;
      for (o = 0; o < e.length; ++o) e[o] = {
        ...e[o]
      }
    }
    n[t] = a, s.set(a, e.get(i))
  }
  let a = 0;
  for (let t in n) a = Math.max(a, t);
  let r = {};
  for (let t in n) {
    let e = n[t];
    if ("Delay" != e.type) continue;
    let i = {
      ...e
    };
    i.type = "delay_write", i.id = ++a, i.ins = [e.ins[0]], i.outs = [], n[i.id] = i, s.set(i, s.get(e));
    let o = {
      ...e
    };
    o.type = "delay_read", o.id = ++a, o.ins = [e.ins[1]], n[o.id] = o, s.set(o, s.get(e)), r[e.id] = {
      readId: o.id,
      writeId: i.id
    }, s.delete(e), delete n[e.id]
  }
  for (let t in n) {
    let e = n[t];
    for (o = 0; o < e.ins.length; ++o) {
      var l = e.ins[o];
      l && l.nodeId in r && (l.nodeId = r[l.nodeId].readId)
    }
    for (let t = 0; t < e.outs.length; ++t)
      for (let n of e.outs[t])
        if (n.nodeId in r) {
          let t = r[n.nodeId].readId,
            e = r[n.nodeId].writeId;
          n.nodeId = 0 == n.portIdx ? e : t, n.portIdx = 0
        }
  }
  return [i, s]
}

function Vt(t) {
  function e(t) {
    for (var e = 0, n = 0; n < t.ins.length; ++n) {
      var i = t.ins[n];
      i && (s.has(i) || e++)
    }
    return e
  }
  var n = [],
    i = [],
    s = new WeakSet;
  for (let i in t.nodes) {
    0 == e(o = t.nodes[i]) && n.push(o)
  }
  for (; n.length > 0;) {
    var o = n.pop();
    i.push(o);
    for (let i = 0; i < o.outs.length; ++i)
      for (let a of o.outs[i]) {
        let i = t.nodes[a.nodeId];
        s.add(i.ins[a.portIdx]), 0 == e(i) && n.push(i)
      }
  }
  return i
}

function jt(t, e) {
  function n(t, e) {
    return "n" + t.id + "_" + e
  }

  function i(e, i) {
    let s = bt[e.type],
      o = e.ins[i],
      a = s.ins[i].default;
    return o ? n(t.nodes[o.nodeId], o.portIdx) : a
  }

  function s(t) {
    c && (c += "\n"), c += "    " + t
  }

  function o(t, e) {
    s("let " + t + " = " + e)
  }

  function a(t, e) {
    o(n(t, 0), e)
  }

  function r(t, e) {
    if ("object" != typeof e) throw "addObj failed, not an object";
    let n = Object.keys(h.objs).length,
      i = "lib.objs." + t + n;
    return h.objs[t + n] = e, i
  } [t, e] = Bt(t, e);
  Object.keys(t.nodes).length;
  let l = Vt(t),
    d = null;
  for (let t of l)
    if ("AudioOut" == t.type) {
      if (d) throw "there can be only one AudioOut node";
      d = t
    } let h = {
      pulse: ut,
      distort: mt,
      objs: {}
    },
    c = "";
  for (let t of l) {
    let l = e.get(t);
    if ("Add" != t.type)
      if ("ADSR" != t.type)
        if ("AudioOut" != t.type)
          if ("Clock" != t.type)
            if ("ClockOut" != t.type)
              if ("Const" != t.type)
                if ("delay_write" != t.type)
                  if ("delay_read" != t.type)
                    if ("Distort" != t.type)
                      if ("Div" != t.type)
                        if ("Filter" != t.type)
                          if ("Knob" != t.type)
                            if ("MidiIn" != t.type)
                              if ("MonoSeq" != t.type)
                                if ("Mul" != t.type)
                                  if ("Noise" != t.type) {
                                    if ("Notes" != t.type)
                                      if ("Pulse" != t.type)
                                        if ("Saw" != t.type)
                                          if ("Scope" != t.type)
                                            if ("Sine" != t.type)
                                              if ("Slide" != t.type)
                                                if ("Sub" != t.type) {
                                                  if ("Tri" != t.type) throw 'unknown node type "' + t.type + '"';
                                                  a(t, r("tri", l) + ".update(" + i(t, 0) + ", sampleTime)")
                                                } else a(t, i(t, 0) + " - " + i(t, 1));
                                    else {
                                      a(t, r("slide", l) + ".update(" + i(t, 0) + ", " + i(t, 1) + ")")
                                    } else {
                                      a(t, r("sine", l) + ".update(" + i(t, 0) + ", " + i(t, 1) + ", sampleTime)")
                                    } else {
                                      a(t, r("scope", l) + ".update(" + i(t, 0) + ", sampleRate)")
                                    } else {
                                      a(t, r("saw", l) + ".update(" + i(t, 0) + ", sampleTime)")
                                    } else {
                                      a(t, r("pulse", l) + ".update(" + i(t, 0) + ", " + i(t, 1) + ", sampleTime)")
                                    }
                                  } else a(t, "2 * Math.random() - 1");
    else a(t, i(t, 0) + " * " + i(t, 1));
    else {
      let e = r("seq", l);
      s("let [" + n(t, 0) + ", " + n(t, 1) + "] = " + e + ".update(time, " + i(t, 0) + ", " + i(t, 1) + ")")
    } else {
      let e = r("midiin", l);
      o(n(t, 0), e + ".freq"), o(n(t, 1), e + ".gate")
    } else {
      let e = r("knob", t.params);
      o(n(t, 0), e + ".value")
    } else {
      a(t, r("filter", new gt) + ".apply(" + i(t, 0) + ", " + i(t, 1) + ", " + i(t, 2) + ")")
    } else a(t, i(t, 0) + "? (" + i(t, 0) + " / " + i(t, 1) + "):0");
    else a(t, "lib.distort(" + i(t, 0) + ", " + i(t, 1) + ")");
    else {
      a(t, r("delay", l.delay) + ".read(" + i(t, 0) + ", sampleRate)")
    } else {
      s(r("delay", l.delay) + ".write(" + i(t, 0) + ")")
    } else {
      let e = r("const", t.params);
      o(n(t, 0), e + ".value")
    } else {
      s(r("clockout", l) + ".update(" + i(t, 0) + ")")
    } else {
      let e = r("clock", t.params);
      a(t, "lib.pulse(time, " + $ + " * " + e + ".value/60, 0.5)")
    } else o(n(t, 0), "0.3 * " + i(t, 0)), o(n(t, 1), "0.3 * " + i(t, 1));
    else {
      a(t, r("adsr", l.env) + ".eval(time, " + i(t, 0) + ", " + i(t, 1) + ", " + i(t, 2) + ", " + i(t, 3) + ", " + i(t, 4) + ")")
    } else a(t, i(t, 0) + " + " + i(t, 1))
  }
  s(d ? "return [" + n(d, 0) + ", " + n(d, 1) + "]" : "return [0,0]");
  let p = new Function("lib", "time", "sampleRate", "sampleTime", c);
  return function(t, e, n) {
    return p(h, t, e, n)
  }
}
xt.prototype.load = function(t) {
  this.clear(), this.graph = t;
  for (let e in t.nodes)(e = Number(e)) >= this.nextId && (this.nextId = e + 1);
  let e = [];
  for (let i in t.nodes) {
    let s = t.nodes[i];
    for (let t = 0; t < s.ins.length; ++t) {
      let n = s.ins[t];
      n && e.push({
        srcId: n.nodeId,
        srcIdx: n.portIdx,
        dstId: i,
        dstIdx: t
      })
    }
    s.ins.fill(void 0);
    for (let t of s.outs) t.length = 0;
    let o = bt[s.type];
    var n = new(o.ctor ? o.ctor : wt)(this, s);
    this.nodes.set(s, n)
  }
  for (let n of e) {
    let e = t.nodes[n.srcId],
      s = t.nodes[n.dstId],
      o = this.nodes.get(e),
      a = this.nodes.get(s);
    var i = l("line");
    h(i, "stroke", "#FFF"), h(i, "stroke-width", "2"), this.svg.appendChild(i), o.connect(o, n.srcIdx, a, n.dstIdx, i)
  }
  this.fitAllNodes();
  let s = 0 == Object.keys(this.graph.nodes).length;
  this.bgText.style.display = s ? "block" : "none", this.onGraphChange(this.graph, this.nodes)
}, xt.prototype.newGraph = function() {
  this.load({
    nodes: {}
  })
}, xt.prototype.newNode = function(t, e, n) {
  for (var i = bt[t], s = this.nextId++, o = {
      id: s,
      type: t,
      name: t,
      x: e,
      y: n,
      ins: new Array(i.ins.length),
      outs: new Array(i.outs.length),
      params: {}
    }, a = 0; a < o.outs.length; ++a) o.outs[a] = [];
  for (let t of i.params) o.params[t.name] = t.default;
  r(!(s in this.graph.nodes)), this.graph.nodes[s] = o;
  var l = new(i.ctor ? i.ctor : wt)(this, o);
  return this.nodes.set(o, l), this.bgText.style.display = "none", this.onGraphChange(this.graph, this.nodes), l
}, xt.prototype.clear = function() {
  if (this.graph) {
    for (let t in this.graph.nodes) {
      let e = this.graph.nodes[t],
        n = this.nodes.get(e);
      this.delNode(n, !1)
    }
    this.nextId = 0, this.fitAllNodes()
  }
}, xt.prototype.delNode = function(t, e) {
  let n = t.data.id;
  this.div.removeChild(t.nodeDiv);
  for (let e in t.data.ins) {
    let i = t.data.ins[e];
    if (!i) continue;
    this.svg.removeChild(t.inLines[e]);
    let s = this.graph.nodes[i.nodeId],
      o = this.nodes.get(s),
      a = i.portIdx,
      r = s.outs[a];
    for (let t in r) {
      r[t].nodeId == n && (r.splice(t, 1), o.outLines[a].splice(t, 1))
    }
  }
  for (let e in t.data.outs) {
    let n = t.data.outs[e];
    for (let i in n) {
      let s = n[i];
      if (!s) continue;
      this.svg.removeChild(t.outLines[e][i]);
      let o = this.graph.nodes[s.nodeId],
        a = this.nodes.get(o),
        r = s.portIdx;
      o.ins[r] = void 0, a.inLines[r] = void 0
    }
  }
  this.nodes.delete(t.data), delete this.graph.nodes[n], 0 == Object.keys(this.graph.nodes).length && (this.bgText.style.display = "block"), !1 !== e && this.onGraphChange(this.graph, this.nodes)
}, xt.prototype.fitNode = function(t, e) {
  let n = t.nodeDiv.getBoundingClientRect(),
    i = this.svg.getBoundingClientRect(),
    s = n.right - i.left,
    o = n.bottom - i.top;
  s > i.width && (h(this.svg, "width", s), e && (this.editTab.scrollLeft = this.editTab.scrollWidth)), o > i.height && (h(this.svg, "height", o), e && (this.editTab.scrollTop = this.editTab.scrollHeight))
}, xt.prototype.fitAllNodes = function() {
  h(this.svg, "height", this.editTab.clientHeight), h(this.svg, "width", this.editTab.clientWidth);
  for (let t in this.graph.nodes) {
    let e = this.graph.nodes[t],
      n = this.nodes.get(e);
    this.fitNode(n)
  }
}, xt.prototype.getMousePos = function(t) {
  var e = this.svg.getScreenCTM();
  return t.touches && (t = t.touches[0]), {
    x: (t.clientX - e.e) / e.a,
    y: (t.clientY - e.f) / e.d
  }
}, xt.prototype.genDOM = function() {
  function t(t) {
    var e = this.getMousePos(t);
    this.drag && this.drag.dragNode(e), this.port && (h(this.port.line, "x2", e.x), h(this.port.line, "y2", e.y))
  }
  this.div.onmousemove = t.bind(this), this.div.ontouchmove = t.bind(this), this.div.onclick = function(t) {
    return this.port ? (this.svg.removeChild(this.port.line), void(this.port = null)) : t.target === this.svg ? (this.createNodeDialog(this.getMousePos(t)), void t.stopPropagation()) : void 0
  }.bind(this), window.onresize = this.fitAllNodes.bind(this)
}, xt.prototype.createNodeDialog = function(t) {
  var e = document.createElement("div"),
    n = new a("Create Node", e);
  e.style["text-align"] = "center";
  for (let o in bt) {
    if (!o.includes("_")) {
      var i = document.createElement("div");
      i.title = bt[o].descr, i.style.border = "2px solid #AAA", i.style.display = "inline-block", i.style.color = "#FFF", i.style["text-align"] = "center", i.style["user-select"] = "none", i.style.width = "100px", i.style.margin = "4px", i.appendChild(document.createTextNode(o)), i.onclick = s.bind(this), ("AudioOut" == o && this.hasNode("AudioOut") || "Notes" == o && this.hasNode("Notes")) && (i.style.color = "#777", i.style.border = "2px solid #777", i.onclick = void 0), e.appendChild(i)
    }

    function s(e) {
      this.newNode(o, t.x, t.y), n.close(), e.stopPropagation()
    }
  }
}, xt.prototype.hasNode = function(t) {
  for (let e in this.graph.nodes) {
    if (this.graph.nodes[e].type == t) return !0
  }
  return !1
}, xt.prototype.playStart = function() {
  for (let t in this.graph.nodes) {
    let e = this.graph.nodes[t];
    this.nodes.get(e).playStart()
  }
}, xt.prototype.playStop = function() {
  for (let t in this.graph.nodes) {
    let e = this.graph.nodes[t];
    this.nodes.get(e).playStop()
  }
}, xt.prototype.resetState = function() {
  for (let t in this.graph.nodes) {
    let e = this.graph.nodes[t];
    this.nodes.get(e).resetState()
  }
}, wt.prototype.genNodeDOM = function() {
  function t(t) {
    t.shiftKey || this.port || (this.editor.drag = this, this.startMousePos = this.editor.getMousePos(t), this.startX = this.data.x, this.startY = this.data.y, t.stopPropagation())
  }

  function e(t) {
    this.editor.drag && (this.editor.drag = null)
  }
  this.nodeDiv = document.createElement("div"), this.nodeDiv.className = "node", this.nodeDiv.style.left = this.data.x, this.nodeDiv.style.top = this.data.y, this.nodeDiv.onmousedown = t.bind(this), this.nodeDiv.ontouchstart = t.bind(this), this.nodeDiv.onmouseup = e.bind(this), this.nodeDiv.ontouchend = e.bind(this), this.nodeDiv.onclick = function(t) {
    t.shiftKey && !this.editor.port && this.editor.delNode(this), t.preventDefault(), t.stopPropagation()
  }.bind(this), this.nodeDiv.ondblclick = this.paramsDialog.bind(this), this.headerDiv = document.createElement("div"), this.headerDiv.className = "node_header", this.headerDiv.textContent = this.data.name, this.headerDiv.title = this.data.type, this.nodeDiv.appendChild(this.headerDiv);
  let n = document.createElement("div");
  n.className = "node_content", this.nodeDiv.appendChild(n);
  let i = document.createElement("div");
  i.className = "node_in_ports", n.appendChild(i), this.centerDiv = document.createElement("div"), this.centerDiv.className = "node_center", n.appendChild(this.centerDiv);
  let s = document.createElement("div");
  s.className = "node_out_ports", n.appendChild(s);
  for (var o = 0; o < this.numIns; ++o) this.genPortDOM(i, o, "input");
  for (o = 0; o < this.numOuts; ++o) this.genPortDOM(s, o, "output");
  this.editor.div.appendChild(this.nodeDiv)
}, wt.prototype.genPortDOM = function(t, e, n) {
  let i = this.editor;
  let s = document.createElement("div");
  s.className = "input" == n ? "node_in_port" : "node_out_port", s.onclick = function(t) {
    t.stopPropagation();
    let [s, o] = this.getPortPos(e, n);
    if (!i.port) {
      "input" == n && (this.disconnect(e), i.onGraphChange(i.graph, i.nodes));
      var a = l("line");
      return h(a, "x1", this.data.x + s), h(a, "y1", this.data.y + o), h(a, "x2", this.data.x + s), h(a, "y2", this.data.y + o), h(a, "stroke", "#FFF"), h(a, "stroke-width", "2"), i.svg.appendChild(a), void(i.port = {
        node: this,
        portIdx: e,
        side: n,
        line: a,
        cx: s,
        cy: o
      })
    }
    i.port.side != n && ("input" == n ? (this.disconnect(e), this.connect(i.port.node, i.port.portIdx, this, e, i.port.line)) : this.connect(this, e, i.port.node, i.port.portIdx, i.port.line), i.port = null, i.onGraphChange(i.graph, i.nodes))
  }.bind(this), t.appendChild(s);
  let o = "input" == n ? this.desc.ins[e].name : this.desc.outs[e],
    a = document.createElement("div");
  a.className = "port_text", a.appendChild(document.createTextNode(o)), s.appendChild(a);
  let r = document.createElement("div");
  r.className = "port_conn", s.appendChild(r), "input" == n ? this.inPorts[e] = r : this.outPorts[e] = r
}, wt.prototype.saveParams = function(t) {
  for (let e in t)
    if (isNaN(t[e]) && !isNaN(this.data.params[e])) throw "invalid parameter " + e;
  if (t.minVal > t.maxVal) throw "invalid parameters";
  "value" in t && "maxVal" in t && (t.value = Math.max(t.value, t.minVal), t.value = Math.min(t.value, t.maxVal)), Object.assign(this.data.params, t)
}, wt.prototype.paramsDialog = function() {
  let t = this,
    e = this.data.name,
    n = Object.assign({}, this.data.params);
  var i = document.createElement("div"),
    s = new a("Node Parameters", i);
  let o = document.createElement("div");
  o.className = "form_div", i.appendChild(o), o.appendChild(document.createTextNode("Node type "));
  let r = document.createElement("input");
  r.type = "text", r.size = 14, r.disabled = !0, r.value = this.type, o.appendChild(r);
  let l = document.createElement("div");
  l.className = "form_div", i.appendChild(l), l.appendChild(document.createTextNode("Node name "));
  let d = document.createElement("input");
  d.type = "text", d.size = 14, d.maxLength = 12, d.value = this.data.name, l.appendChild(d), d.oninput = function(t) {
    e = d.value
  };
  for (let t of this.desc.params) {
    let e = document.createElement("div");
    e.className = "form_div", i.appendChild(e);
    let s = document.createTextNode(t.name + " ");
    e.appendChild(s);
    let o = document.createElement("input");
    o.type = "text", o.size = 12, o.maxLength = 10, o.value = this.data.params[t.name], e.appendChild(o), o.oninput = function(e) {
      n[t.name] = Number(o.value)
    }
  }
  let h = document.createElement("button");
  h.textContent = "Save", h.className = "form_btn", i.appendChild(h);
  let c = document.createElement("button");
  c.textContent = "Cancel", c.className = "form_btn", i.appendChild(c);
  let p = document.createElement("button");

  function u() {
    t.headerDiv.textContent = d.value, t.data.name = e;
    try {
      t.saveParams(n), s.close()
    } catch (t) {}
  }
  return p.textContent = "Delete", p.className = "form_btn", i.appendChild(p), h.onclick = u, c.onclick = function() {
    s.close()
  }, p.onclick = function() {
    t.editor.delNode(t), s.close()
  }, s.addKeyListener((function(t) {
    "Enter" == t && u()
  })), i
}, wt.prototype.getPortPos = function(t, e) {
  let n = "input" == e ? this.inPorts[t] : this.outPorts[t],
    i = this.nodeDiv.getBoundingClientRect(),
    s = n.getBoundingClientRect();
  return [s.left + s.width / 2 - i.left, s.top + s.height / 2 - i.top]
}, wt.prototype.dragNode = function(t) {
  var e = this.startMousePos,
    n = this.startX + (t.x - e.x),
    i = this.startY + (t.y - e.y),
    s = n - this.data.x,
    o = i - this.data.y;
  this.data.x = n, this.data.y = i, this.nodeDiv.style.left = this.data.x, this.nodeDiv.style.top = this.data.y;
  for (var a = 0; a < this.inLines.length; ++a) {
    if (u = this.inLines[a]) {
      var r = Number(d(u, "x2")),
        l = Number(d(u, "y2"));
      h(u, "x2", r + s), h(u, "y2", l + o)
    }
  }
  for (a = 0; a < this.outLines.length; ++a)
    for (var c = this.outLines[a], p = 0; p < c.length; ++p) {
      var u;
      if (u = c[p]) {
        var m = Number(d(u, "x1")),
          f = Number(d(u, "y1"));
        h(u, "x1", m + s), h(u, "y1", f + o)
      }
    }
  this.editor.fitNode(this, !0)
}, wt.prototype.disconnect = function(t) {
  let e = this.data,
    n = e.ins[t];
  if (void 0 === n) return;
  let i = n.nodeId,
    s = n.portIdx,
    o = this.editor.graph.nodes[i],
    a = this.editor.nodes.get(o),
    r = this.inLines[t];
  this.inLines[t] = void 0, a.outLines[s] = a.outLines[s].filter(t => t !== r), this.editor.svg.removeChild(r), e.ins[t] = void 0, o.outs[s] = o.outs[s].filter(n => n.nodeId !== e.id || n.portIdx != t)
}, wt.prototype.connect = function(t, e, n, i, s) {
  let o = t.data,
    a = n.data;
  if (r(e < o.outs.length), a.ins[i]) return;
  if (o === a) return;
  o.outs[e].push({
    nodeId: a.id,
    portIdx: i
  }), a.ins[i] = {
    nodeId: o.id,
    portIdx: e
  }, t.outLines[e].push(s), n.inLines[i] = s;
  let [l, d] = t.getPortPos(e, "output"), [c, p] = n.getPortPos(i, "input");
  var u = o.x + l,
    m = o.y + d,
    f = a.x + c,
    y = a.y + p;
  h(s, "x1", u), h(s, "y1", m), h(s, "x2", f), h(s, "y2", y)
}, wt.prototype.playStart = function() {}, wt.prototype.playStop = function() {}, wt.prototype.resetState = function() {}, Ct.prototype = Object.create(wt.prototype), Ct.prototype.resetState = function() {
  this.env.reset()
}, kt.prototype = Object.create(wt.prototype), kt.prototype.resetState = function() {
  this.delay.reset()
}, Nt.prototype = Object.create(wt.prototype), Nt.prototype.saveParams = function(t) {
  wt.prototype.saveParams.call(this, t), this.knob.minVal = t.minVal, this.knob.maxVal = t.maxVal, this.knob.value = t.value, this.knob.drawKnob()
}, It.prototype = Object.create(wt.prototype), It.prototype.saveParams = function(t) {
  wt.prototype.saveParams.call(this, t), this.input.value = t.value, this.input.onchange()
}, Et.prototype = Object.create(Nt.prototype), Dt.prototype = Object.create(wt.prototype), Dt.prototype.playStart = function() {
  X([250])
}, Dt.prototype.playStop = function() {
  X([252])
}, Dt.prototype.update = function(t) {
  !this.clockSgn && t > 0 && X([248]), this.clockSgn = t > 0
}, St.prototype = Object.create(wt.prototype), St.prototype.update = function(t, e, n) {
  return this.phase += n * t, this.phase % 1 < e ? -1 : 1
}, Tt.prototype = Object.create(wt.prototype), Tt.prototype.update = function(t, e) {
  return this.phase += e * t, 2 * (this.phase % 1) - 1
}, Mt.prototype = Object.create(wt.prototype), Mt.prototype.update = function(t, e, n) {
  let i = this.data.params.minVal,
    s = this.data.params.maxVal;
  !this.syncSgn && e > 0 && (this.phase = 0), this.syncSgn = e > 0;
  let o = this.phase % 1;
  return this.phase += n * t, i + (Math.sin(2 * o * Math.PI) + 1) / 2 * (s - i)
}, Pt.prototype = Object.create(wt.prototype), Pt.prototype.update = function(t, e) {
  return e < 1 && (e = 1), this.s += 1 / e * (t - this.s), this.s
}, _t.prototype = Object.create(wt.prototype), _t.prototype.update = function(t, e) {
  this.phase += e * t;
  let n = this.phase % 1;
  return n < .5 ? 4 * n - 1 : 1 - 4 * (n - .5)
}, Lt.prototype = Object.create(wt.prototype), Lt.prototype.resetState = function() {
  this.nextPat && (clearTimeout(this.blinkTimer), this.patBtns[this.nextPat].className = "patsel_btn", this.nextPat = void 0);
  for (let t = 0; t < this.data.patterns.length; ++t) this.data.patterns[t] && this.genGridDOM(t);
  this.select(this.patIdx), this.clockSgn = !1, this.clockCnt = 0, this.curStep = !1, this.freq = 0, this.gate = 0, this.trigTime = 0
}, Lt.prototype.newGrid = function(t, e) {
  let n = new Array(t);
  for (let t = 0; t < n.length; ++t) n[t] = new Array(e), n[t].fill(0);
  return n
}, Lt.prototype.extend = function() {
  let t = this.data.patterns[this.patIdx];
  for (var e = 0; e < 16; ++e) {
    let e = new Array(this.scale.length);
    e.fill(0), t.push(e)
  }
  this.genGridDOM(this.patIdx), this.select(this.patIdx)
}, Lt.prototype.extendCopy = function(t) {
  void 0 === t && (t = 16);
  let e = this.data.patterns[this.patIdx],
    n = e.length;
  for (var i = 0; i < t; ++i) {
    let s = e[n - t + i].slice();
    e.push(s)
  }
  this.genGridDOM(this.patIdx), this.select(this.patIdx)
}, Lt.prototype.shrink = function(t) {
  t || (t = 16);
  let e = this.data.patterns[this.patIdx];
  if (!(e.length <= t)) {
    for (var n = 0; n < t; ++n) e.pop();
    this.clockCnt / tt > e.length && (this.clockCnt -= t * tt), this.genGridDOM(this.patIdx), this.select(this.patIdx)
  }
}, Lt.prototype.setScale = function(t, e, n) {
  let i = this.data,
    s = ct(t, e, n);
  var o = Math.floor(this.scale.length / i.numOcts),
    a = Math.floor(s.length / n);
  for (let t = 0; t < i.patterns.length; ++t) {
    let e = i.patterns[t],
      n = this.newGrid(e.length, s.length);
    for (let t = 0; t < e.length; ++t)
      for (let i = 0; i < e[t].length; ++i)
        if (e[t][i]) {
          var r = Math.floor(i / o),
            l = i % o;
          if (!(l >= a)) {
            var d = r * a + l;
            d >= n[t].length || (n[t][d] = 1)
          }
        } i.patterns[t] = n
  }
  i.scaleRoot = t, i.scaleName = e, i.numOcts = n, this.scale = s, this.numRows = s.length;
  for (let t = 0; t < this.data.patterns.length; ++t) this.data.patterns[t] && this.genGridDOM(t);
  this.select(this.patIdx)
}, Lt.prototype.select = function(t) {
  let e = this.data;
  e.patterns[t] || (e.patterns[t] = this.newGrid(16, this.numRows), this.genGridDOM(t)), this.highlight(void 0), this.patIdx = t, this.nextPat = void 0, clearTimeout(this.blinkTimer);
  for (var n = 0; n < this.patBtns.length; ++n) this.patBtns[n].className = n == t ? "patsel_btn_on" : "patsel_btn";
  for (let e = 0; e < this.gridDiv.children.length; ++e) {
    let n = this.gridDiv.children[e];
    n.style.display = n === this.patDivs[t] ? "block" : "none"
  }
}, Lt.prototype.queue = function(t) {
  function e(n) {
    this.patBtns[t].className = n ? "patsel_btn_queue" : "patsel_btn", this.blinkTimer = setTimeout(t => e.call(this, !n), 200)
  }
  Kt() ? void 0 === this.nextPat || (clearTimeout(this.blinkTimer), this.patBtns[this.nextPat].className = "patsel_btn", t !== this.nextPat) ? t !== this.patIdx && (this.nextPat = t, this.blinkTimer = setTimeout(t => e.call(this, !0), 200)) : this.nextPat = void 0 : this.select(t)
}, Lt.prototype.highlight = function(t) {
  let e = this.patIdx,
    n = this.cellDivs[e],
    i = this.curStep;
  if (this.curStep = t, !1 !== i && i < n.length)
    for (var s = 0; s < this.numRows; ++s) {
      let t = n[i][s],
        e = this.getCellColor(i, s);
      t.style["background-color"] = e
    }
  if (void 0 !== t)
    for (s = 0; s < this.numRows; ++s) {
      let e = n[t][s],
        i = this.getCellColor(t, s);
      e.style["background-color"] = i
    }
}, Lt.prototype.getCellColor = function(t, e) {
  let n = this.data.patterns[this.patIdx];
  return t === this.curStep ? n[t][e] ? "rgb(255,255,255)" : "rgb(150,0,0)" : n[t][e] ? "rgb(255,0,0)" : "rgb(150,0,0)"
}, Lt.prototype.genGridDOM = function(t) {
  r(void 0 !== t);
  let e = this,
    n = this.data.patterns[t],
    i = n.length,
    s = this.numRows;
  r(n instanceof Array);
  let o = this.cellDivs[t] = [];

  function a(t, i) {
    var a = n[t][i],
      r = document.createElement("div");
    r.style.display = "inline-block";
    var l = document.createElement("div");
    return l.style.display = "inline-block", l.style.width = "14px", l.style.height = "14px", l.style.margin = "2px", l.style["margin-left"] = t % 4 == 0 ? "3px" : "2px", l.style["margin-right"] = t % 4 == 3 ? "3px" : "2px", l.style["background-color"] = a ? "rgb(255,0,0)" : "rgb(150,0,0)", r.appendChild(l), r.onclick = function() {
      for (var a = n[t][i], r = 0; r < s; ++r) {
        n[t][r] = 0;
        let i = e.getCellColor(t, r);
        o[t][r].style["background-color"] = i
      }
      a = a ? 0 : 1, n[t][i] = a;
      let d = e.getCellColor(t, i);
      l.style["background-color"] = d
    }, t in o || (o[t] = []), o[t][i] = l, r
  }

  function l(t) {
    var e = document.createElement("div");
    e.style.display = "inline-block", e.style.margin = "0px 2px";
    for (var n = 0; n < s; ++n) {
      for (var i = document.createElement("div"), o = 0; o < 16; ++o) {
        var r = a(16 * t + o, s - n - 1);
        i.appendChild(r)
      }
      e.appendChild(i)
    }
    return e
  }
  this.patDivs[t] && this.gridDiv.removeChild(this.patDivs[t]);
  let d = this.patDivs[t] = document.createElement("div");
  d.style.display = "none", this.gridDiv.appendChild(d), r(i % 16 == 0);
  for (var h = i / 16, c = 0; c < h; ++c) {
    var p = document.createElement("div");
    p.style.display = "inline-block", d.appendChild(p);
    var u = l(c);
    if (p.appendChild(u), c < h - 1) {
      var m = 18 * this.numRows,
        f = document.createElement("div");
      f.style.display = "inline-block", f.style.width = "3px", f.style.height = m - 4 + "px", f.style.background = "#900", f.style.margin = "2px 1px", p.appendChild(f)
    }
  }
}, Lt.prototype.update = function(t, e, n) {
  if (!this.clockSgn && e > 0) {
    if (this.clockCnt % tt == 0) {
      var i = this.data.patterns[this.patIdx],
        s = this.clockCnt / tt;
      r(s < i.length), this.gate = 0, this.trigTime = 0;
      for (var o = 0; o < this.numRows; ++o) {
        if (!i[s][o]) continue;
        let e = this.scale[o];
        this.freq = e.getFreq(), this.gate = 1, this.trigTime = t
      }
      this.highlight(s), s === i.length - 1 && (this.clockCnt -= i.length * tt, void 0 !== this.nextPat && this.select(this.nextPat))
    }
    this.clockCnt++
  }
  return this.gate > 0 && t - this.trigTime > n && (this.gate = 0, this.trigTime = 0), this.clockSgn = e > 0, r(!isNaN(this.freq), "MonoSeq freq is NaN"), r(!isNaN(this.gate), "MonoSeq gate is NaN"), [this.freq, this.gate]
}, Ot.prototype = Object.create(wt.prototype), At.prototype = Object.create(wt.prototype), At.prototype.redraw = function() {
  let t = this.ctx,
    e = this.canvas.width,
    n = this.canvas.height,
    i = this.data.params.minVal,
    s = this.data.params.maxVal;
  t.clearRect(0, 0, e, n), t.fillStyle = "#000", t.fillRect(0, 0, e, n);
  let o = n - (0 - i) / (s - i) * n;
  t.strokeStyle = "#FFF", t.beginPath(), t.moveTo(0, o), t.lineTo(e, o), t.stroke(), t.strokeStyle = "#F00", t.beginPath(), t.moveTo(0, o);
  for (let o = 0; o < this.buffer.length; ++o) {
    let a = (this.writeIdx + o) % this.buffer.length,
      r = (this.buffer[a] - i) / (s - i),
      l = o / this.buffer.length * e,
      d = n - r * n;
    t.lineTo(l, d), t.stroke()
  }
}, At.prototype.update = function(t, e) {
  let n = Math.floor(this.windowLen * e / this.buffer.length);
  this.sampleCount % n == 0 && (this.writeIdx = (this.writeIdx + 1) % this.buffer.length, this.buffer[this.writeIdx] = t), this.sampleCount % 2048 == 0 && setTimeout(() => this.redraw(), 0), this.sampleCount++
};
let qt = document.getElementById("btn_new"),
  Ft = document.getElementById("btn_play"),
  Rt = document.getElementById("btn_stop"),
  Gt = !1,
  Ht = function() {
    return [0, 0]
  },
  zt = new xt;

function Kt() {
  return Gt
}

function Ut(t) {
  Wt(), i("edit");
  let e = JSON.parse(t);
  zt.load(e)
}

function Jt() {
  return JSON.stringify(zt.graph)
}

function Xt() {
  if (!Gt) {
    Ft.style.display = "none", Rt.style.display = "inline-block", document.title = "▶ " + document.title, zt.playStart();
    var t = I(),
      e = 1 / t,
      n = 0;
    E((function(i, s) {
      for (var o = 0; o < i.length; ++o) {
        let [a, r] = Ht(n, t, e);
        if ("number" != typeof a) return;
        i[o] = a, s[o] = r, n += e
      }
    })), Gt = !0
  }
}

function Wt() {
  Gt && (Ft.style.display = "inline-block", Rt.style.display = "none", document.title = document.title.substr(2), D(), zt.playStop(), zt.resetState(), Gt = !1)
}

function Yt() {
  Gt && Rt.onclick(), confirm("You will lose any unsaved work.") && (i("edit"), zt.clear(), history.pushState(null, null, "."))
}
zt.onGraphChange = function(t, e) {
  Ht = jt(t, e)
}, document.body.onload = function() {
  let t = localStorage.getItem("graph");
  if (t && !window.location.hash) try {
    Ut(t)
  } catch (t) {
    localStorage.removeItem("graph"), (zt = new xt).newGraph()
  } else zt.newGraph()
}, window.onunload = function() {
  localStorage.setItem("graph", Jt())
}, window.onkeydown = function(t) {
  document.activeElement && "input" == document.activeElement.nodeName.toLowerCase() || 32 == t.keyCode && (Gt ? Rt.onclick() : Ft.onclick())
}, Ft.onclick = Xt, Rt.onclick = Wt, qt.onclick = Yt;
export {
  Jt as exportData, Ut as importData, Kt as isPlaying, Yt as newProject, Xt as startPlayback, Wt as stopPlayback
};
