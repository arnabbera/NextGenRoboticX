import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, CloudCog, KeyRound, Laptop, Network, RotateCcw, Router, ShieldAlert, Terminal, XCircle } from "lucide-react";

const diagnostics = `# Identity and interfaces
hostname
hostname -I
ip address
ip route

# NetworkManager connection status (current Raspberry Pi OS)
nmcli device status
nmcli connection show --active

# Test in layers: gateway, internet IP, then DNS name
ping -c 4 192.168.1.1     # replace with your gateway
ping -c 4 1.1.1.1
getent hosts raspberrypi.com

# Inspect SSH service and listening sockets
systemctl status ssh --no-pager
ss -lntp`;

const remoteLab = `# On your trusted client computer: create a modern SSH key
ssh-keygen -t ed25519 -a 100 -C "pi-course-laptop"

# Install the public key on the Pi over the authorised local network
ssh-copy-id student@pi-lab.local

# Connect and verify the expected host fingerprint before accepting it
ssh student@pi-lab.local

# Copy one project file securely from client to Pi
scp monitor.py student@pi-lab.local:~/projects/chapter-7/

# Copy a log back to the client
scp student@pi-lab.local:~/projects/chapter-7/status.log .`;

const questions = [
  { question: "What does DHCP normally provide to a network client?", options: ["IP configuration such as address, gateway and DNS", "GPIO voltage", "Python indentation", "A microSD image"], answer: 0 },
  { question: "What is DNS used for?", options: ["Translate names to network addresses", "Drive a motor", "Measure temperature", "Encrypt a filesystem automatically"], answer: 0 },
  { question: "What does a default gateway do?", options: ["Forwards traffic toward other networks", "Stores SSH keys", "Controls PWM", "Formats logs"], answer: 0 },
  { question: "Why verify an SSH host-key fingerprint?", options: ["To confirm the server identity and reduce interception risk", "To increase Wi-Fi power", "To select BCM pins", "To install Linux"], answer: 0 },
  { question: "Which key file should remain private?", options: ["The private SSH key", "The public key", "The hostname", "The README"], answer: 0 },
  { question: "What is SCP used for?", options: ["Securely copy files over SSH", "Scan I2C", "Control a servo", "Create a PWM signal"], answer: 0 },
  { question: "What does pinging an IP successfully while a hostname fails suggest?", options: ["A likely DNS/name-resolution problem", "A broken GPIO resistor", "No power supply", "A Python syntax error"], answer: 0 },
  { question: "Why should SSH not be exposed directly to the public internet without a secure design?", options: ["It increases attack exposure", "SSH only works over HDMI", "It disables Linux", "It changes GPIO voltage"], answer: 0 },
  { question: "What is least privilege?", options: ["Grant only the access needed for the task", "Run everything as root", "Share one password with everyone", "Disable authentication"], answer: 0 },
  { question: "Which command displays the routing table?", options: ["ip route", "pwd", "mkdir", "gpio read"], answer: 0 },
];

export default function RaspberryPiChapterSevenLesson() {
  return <><article className="space-y-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
    <header><p className="font-semibold uppercase tracking-wider text-blue-700">Chapter 7</p><h2 className="mt-2 text-3xl font-bold text-slate-900">Networking, SSH and Remote Development</h2><p className="mt-4 leading-8 text-slate-600">A Raspberry Pi is often installed without a dedicated monitor or keyboard. Secure networking and remote-development skills let you administer, program, transfer files, inspect logs, and troubleshoot the Pi from a trusted computer while preserving device and account security.</p></header>

    <section><h3 className="text-2xl font-bold">Learning objectives</h3><ul className="mt-4 grid gap-3 md:grid-cols-2">{["Explain addresses, subnet, gateway, DHCP, DNS, ports, and hostnames.", "Inspect wired and wireless interfaces, routes, and name resolution.", "Enable and use SSH only on authorised networks.", "Create keys and verify an SSH server's host identity.", "Transfer project files using SCP or SFTP.", "Apply least privilege, updates, firewall rules, and secure remote workflows."].map(item=><li key={item} className="rounded-xl border border-slate-200 p-4"><b className="mr-2 text-emerald-600">✓</b>{item}</li>)}</ul></section>

    <section className="rounded-2xl bg-blue-50 p-6"><div className="flex items-center gap-3"><Network className="text-blue-700"/><h3 className="text-2xl font-bold">Network foundations</h3></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Card icon={Laptop} title="IP address" text="Identifies an interface on an IP network. IPv4 commonly uses dotted decimal; IPv6 uses hexadecimal notation."/><Card icon={Router} title="Subnet and gateway" text="The prefix defines the local network. The default gateway forwards traffic destined outside it."/><Card icon={CloudCog} title="DHCP and DNS" text="DHCP supplies configuration; DNS resolves human-readable hostnames to addresses."/><Card icon={Terminal} title="Ports and services" text="A server listens on a transport port. SSH commonly uses TCP 22, but a port number alone does not make a service secure."/></div></section>

    <section><h3 className="text-2xl font-bold">Wired, Wi-Fi and addressing choices</h3><div className="mt-5 overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-3">Choice</th><th className="p-3">Advantage</th><th className="p-3">Consideration</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">Ethernet</td><td className="p-3">Stable, predictable and often lower latency</td><td className="p-3">Requires cable and available switch/router port</td></tr><tr><td className="p-3 font-semibold">Wi-Fi</td><td className="p-3">Flexible placement</td><td className="p-3">Signal, interference, credentials and regulatory country</td></tr><tr><td className="p-3 font-semibold">DHCP reservation</td><td className="p-3">Predictable address managed by the router</td><td className="p-3">Requires authorised router administration</td></tr><tr><td className="p-3 font-semibold">Local hostname/mDNS</td><td className="p-3">Convenient name such as pi-lab.local</td><td className="p-3">Depends on local name-resolution support</td></tr></tbody></table></div></section>

    <section><div className="flex items-center gap-3"><Terminal className="text-emerald-700"/><h3 className="text-2xl font-bold">Diagnose the network in layers</h3></div><p className="mt-3 leading-7 text-slate-600">Start with link/interface state, then local address, route, gateway reachability, external IP reachability, and finally DNS. This isolates the failing layer instead of changing several settings at once.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300"><code>{diagnostics}</code></pre></section>

    <section><div className="flex items-center gap-3"><KeyRound className="text-purple-700"/><h3 className="text-2xl font-bold">SSH identity and trust</h3></div><p className="mt-4 leading-8 text-slate-600">SSH encrypts remote terminal and file-transfer traffic. Two different key concepts matter: the server host key identifies the Pi, while a user's key pair authenticates the person or client. Verify the expected host fingerprint through a trusted channel before accepting a new server identity.</p><div className="mt-5 grid gap-4 md:grid-cols-2"><Card icon={KeyRound} title="Private key" text="Remains on the trusted client, protected by filesystem permissions and preferably a strong passphrase. Never share it."/><Card icon={KeyRound} title="Public key" text="May be installed in the authorised account's ~/.ssh/authorized_keys file on the Pi."/><Card icon={ShieldAlert} title="Host key" text="Lets the client detect an unexpected server identity or possible interception."/><Card icon={Laptop} title="Account" text="Use a named non-root account and elevate only specific understood administrative commands."/></div></section>

    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><div className="flex items-center gap-3"><ShieldAlert className="text-amber-700"/><h3 className="text-xl font-bold">Secure SSH baseline</h3></div><ul className="mt-4 space-y-2 text-slate-700"><li>• Enable SSH only when required and only on networks you are authorised to use.</li><li>• Use unique accounts, current updates, strong credentials, and preferably key authentication.</li><li>• Do not permit direct root login; apply least privilege with controlled sudo access.</li><li>• Restrict access with network segmentation, VPN, firewall rules, or an approved gateway.</li><li>• Never expose SSH directly through router port forwarding without a reviewed security design.</li><li>• Review authentication logs and remove lost or unused public keys promptly.</li></ul></section>

    <section><div className="flex items-center gap-3"><Terminal className="text-indigo-700"/><h3 className="text-2xl font-bold">Remote connection and secure file transfer</h3></div><p className="mt-3 leading-7 text-slate-600">Run these commands on your own trusted client and Pi. Replace the example account, hostname, gateway, and paths. Confirm that you are connecting to the correct authorised machine.</p><pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-cyan-200"><code>{remoteLab}</code></pre><p className="mt-4 leading-7 text-slate-600">SFTP provides an interactive secure file-transfer session. Tools such as VS Code Remote SSH can edit and run code on the Pi while the user interface stays on the client. Keep project dependencies in a virtual environment on the Pi because code executes against its operating system and hardware.</p></section>

    <section><h3 className="text-2xl font-bold">Remote-development workflow</h3><ol className="mt-4 space-y-3">{["Confirm the Pi is updated, powered reliably, and connected to an authorised local network.", "Enable SSH deliberately and record the expected hostname, address, and host-key fingerprint.", "Create a key pair on the trusted client and install only its public key on the Pi.", "Connect as a non-root user and create a project directory and virtual environment.", "Edit through SSH, SFTP, Git, or a remote editor; never store secrets in the repository.", "Run the program, inspect logs and resource usage, then close the session and preserve a safe hardware state."].map((item,i)=><li key={item} className="flex gap-4 rounded-xl bg-slate-50 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{i+1}</span><span>{item}</span></li>)}</ol></section>

    <section><h3 className="text-2xl font-bold">Troubleshooting matrix</h3><div className="mt-5 overflow-x-auto"><table className="w-full text-left"><thead className="bg-slate-900 text-white"><tr><th className="p-3">Symptom</th><th className="p-3">Checks</th></tr></thead><tbody className="divide-y"><tr><td className="p-3 font-semibold">No route to host</td><td className="p-3">Interface, address, subnet, route, gateway, client network</td></tr><tr><td className="p-3 font-semibold">Connection refused</td><td className="p-3">Correct address/port, SSH service status, listening socket</td></tr><tr><td className="p-3 font-semibold">Connection timeout</td><td className="p-3">Reachability, Wi-Fi signal, firewall, segmentation, wrong address</td></tr><tr><td className="p-3 font-semibold">Permission denied</td><td className="p-3">User, key selection, public-key installation, file permissions, logs</td></tr><tr><td className="p-3 font-semibold">Host key changed</td><td className="p-3">Stop and verify identity; do not simply delete the warning</td></tr><tr><td className="p-3 font-semibold">IP works, name fails</td><td className="p-3">DNS/mDNS configuration and resolver status</td></tr></tbody></table></div></section>

    <section className="rounded-2xl bg-slate-900 p-6 text-white"><h3 className="text-2xl font-bold">Hands-on activity</h3><p className="mt-3 leading-7 text-slate-200">On an isolated or authorised local network, record the Pi's hostname, address, prefix, gateway, and DNS resolver. Enable SSH, verify the host fingerprint locally, create a client key with a passphrase, and install the public key. Connect remotely, copy a Chapter 4 script to <code>~/projects/chapter-7</code>, run it inside a virtual environment, copy its log back, then document each verification step.</p></section>
    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6"><h3 className="text-xl font-bold text-blue-900">Chapter completion checklist</h3><p className="mt-3 leading-7 text-blue-800">Complete layered diagnostics and the authorised SSH/file-transfer lab, explain host versus user keys, review the uploaded video/PDF when available, and score at least 80% below.</p></section>
  </article><ChapterQuiz/></>;
}

function ChapterQuiz(){const [answers,setAnswers]=useState({});const [submitted,setSubmitted]=useState(false);const score=useMemo(()=>questions.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0),[answers]);const complete=Object.keys(answers).length===questions.length;const passed=score>=8;const reset=()=>{setAnswers({});setSubmitted(false)};return <section className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3 border-b border-slate-200 pb-5"><CircleHelp className="text-blue-600" size={30}/><div><h2 className="text-2xl font-bold">Chapter 7 Quiz</h2><p className="text-sm text-slate-500">10 questions • Pass mark: 80%</p></div></div><div className="mt-6 space-y-6">{questions.map((q,i)=><fieldset key={q.question} className="rounded-2xl border border-slate-200 p-5"><legend className="px-2 font-bold">{i+1}. {q.question}</legend><div className="mt-3 space-y-2">{q.options.map((o,j)=>{const selected=answers[i]===j;const correct=submitted&&j===q.answer;const incorrect=submitted&&selected&&j!==q.answer;return <label key={o} className={`flex cursor-pointer gap-3 rounded-xl border p-3 ${correct?"border-green-300 bg-green-50":incorrect?"border-red-300 bg-red-50":selected?"border-blue-400 bg-blue-50":"border-slate-200 hover:bg-slate-50"}`}><input type="radio" name={`pi-ch7-${i}`} checked={selected} disabled={submitted} onChange={()=>setAnswers(a=>({...a,[i]:j}))} className="mt-1"/><span>{o}</span></label>})}</div></fieldset>)}</div>{!submitted?<button disabled={!complete} onClick={()=>setSubmitted(true)} className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:bg-slate-300">Submit Quiz</button>:<div className={`mt-6 rounded-2xl border p-6 ${passed?"border-green-300 bg-green-50":"border-red-300 bg-red-50"}`}><div className="flex gap-3">{passed?<CheckCircle2 className="text-green-700"/>:<XCircle className="text-red-700"/>}<div><h3 className="text-xl font-bold">{passed?"Chapter quiz passed":"Review the lesson and try again"}</h3><p>You scored {score}/10 ({score*10}%).</p></div></div><button onClick={reset} className="mt-5 inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 font-semibold"><RotateCcw size={18}/> Retake Quiz</button></div>}</section>}

function Card({icon:Icon,title,text}){return <div className="rounded-2xl border border-slate-200 bg-white p-5"><Icon className="text-blue-600" size={26}/><h4 className="mt-3 font-bold text-slate-900">{title}</h4><p className="mt-2 leading-7 text-slate-600">{text}</p></div>}
