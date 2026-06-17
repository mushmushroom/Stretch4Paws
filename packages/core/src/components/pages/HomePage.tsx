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
            <Link className="btn" to={AppRoutes.STRETCHES}>Start stretching</Link>
            <Link className="btn btn--outline-basic" to={AppRoutes.DESKTOP_APP}>Download desktop app</Link>
          </div>
        </div>
        <div className="hero__preview">
          <HeroAppPreview />
        </div>
      </section>
      
      <section className="how">How it works</section>
      <section className="app-banner">desktop app banner</section>
    </PublicWrapper>
  );
}
