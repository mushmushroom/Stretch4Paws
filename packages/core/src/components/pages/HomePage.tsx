import { Link } from 'react-router';
import { AppRoutes } from '../../lib/constants';
import PublicWrapper from '../pageWrappers/PublicWrapper';
import HeroAppPreview from './HeroAppPreview';

export default function HomePage() {
  return (
    <PublicWrapper>
      <section className="hero">
        <div className="hero__info">
          <h1 className="hero__title">
            Stretch more. <span>Sit less. Feel pawsome.</span>
          </h1>
          <p className="hero__descr">
            Quick guided desk stretches with a cute companion who keeps you moving. Build a streak,
            hit daily goals, and end the day feeling loose - not stiff.
          </p>
          <div className="hero__actions">
            <Link className="btn" to={AppRoutes.STRETCHES}>
              Start stretching
            </Link>
            <Link className="btn btn--outline-basic" to={AppRoutes.DESKTOP_APP}>
              Download desktop app
            </Link>
          </div>
        </div>
        <div className="hero__preview">
          <HeroAppPreview />
        </div>
      </section>

      <section className="how">
        <div className="how__title-block">
          <h2 className="how__title">How it works</h2>
          <p className="how__descr">Three steps to a looser, happier workday.</p>
        </div>
        <ol className="how__list">
          <li className="how__item">
            <h4 className="how__item-title">Pick a stretch</h4>
            <p className="how__item-descr">
              Hit start and your pup guides you through today's stretch.
            </p>
          </li>
          <li className="how__item">
            <h4 className="how__item-title">Follow the pup</h4>
            <p className="how__item-descr">
              A friendly companion demos each move while a gentle timer counts you through it.
            </p>
          </li>
          <li className="how__item">
            <h4 className="how__item-title">Build your streak</h4>
            <p className="how__item-descr">
              Track stretches per day, week and month and watch your streak grow in your account.
            </p>
          </li>
        </ol>
      </section>
      <section className="app-banner">
        <div className="app-banner__wrapper">
          <div className="app-banner__title-block">
            <h2 className="app-banner__title">Keep stretching, even offline</h2>
            <p className="app-banner__descr">
              The desktop app sends gentle reminders from your menu bar and syncs your streak across
              every device.
            </p>
          </div>
          <Link className="btn" to={AppRoutes.DESKTOP_APP}>Download</Link>
        </div>
      </section>
    </PublicWrapper>
  );
}
