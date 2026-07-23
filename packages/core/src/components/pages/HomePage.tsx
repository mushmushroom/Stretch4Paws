import { Link } from 'react-router';
import { AppRoutes } from '../../lib/constants';
import PublicWrapper from '../pageWrappers/PublicWrapper';
import HeroAppPreview from './HeroAppPreview';
import CardGrid from '../common/CardGrid';
import PageHero from '../common/PageHero';

export default function HomePage() {
  return (
    <PublicWrapper>
      <PageHero
        title={<>Stretch more. <span>Sit less. Feel pawsome.</span></>}
        description="Quick guided desk stretches with a cute companion who keeps you moving. Build a streak, hit daily goals, and end the day feeling loose - not stiff."
        actions={
          <>
            <Link className="btn" to={AppRoutes.STRETCHES}>
              Start stretching
            </Link>
            <Link className="btn btn--outline-basic" to={AppRoutes.DESKTOP_APP}>
              Download desktop app
            </Link>
          </>
        }
      >
        <HeroAppPreview />
      </PageHero>

      <section className="how">
        <div className="how__title-block">
          <h2 className="how__title">How it works</h2>
          <p className="how__descr">Three steps to a looser, happier workday.</p>
        </div>
        <CardGrid
          ordered
          variant="accent"
          items={[
            { title: 'Pick a stretch', text: "Hit start and your pup guides you through today's stretch." },
            { title: 'Follow the pup', text: 'A friendly companion demos each move while a gentle timer counts you through it.' },
            { title: 'Build your streak', text: 'Track stretches per day, week and month and watch your streak grow in your account.' },
          ]}
        />
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
