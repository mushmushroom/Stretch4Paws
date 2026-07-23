import { DownloadLinks } from '../../lib/constants';
import PageHero from '../common/PageHero';
import PublicWrapper from '../pageWrappers/PublicWrapper';
import HeroAppPreview from './HeroAppPreview';
import CardGrid from '../common/CardGrid';

export default function DesktopAppPage() {
  return (
    <PublicWrapper>
      <PageHero
        title={
          <>
            Your desk buddy that reminds you to <span>stretch</span>.
          </>
        }
        description="Stretch4Paws lives quietly in your menu bar and gives you a gentle, cute nudge to move — so you finish the day feeling good, not stiff."
        actions={
          <>
            <a className="btn btn--purple" href={DownloadLinks.MAC} download>
              Download for Mac
            </a>
            <a className="btn btn--outline-basic" href={DownloadLinks.WIN} download>
              Download for Windows
            </a>
            <span className="badge badge--warning">⚠ Reminders not available on macOS yet</span>
          </>
        }
      >
        <HeroAppPreview />
      </PageHero>

      <section className="app-features">
        <CardGrid
          ordered={false}
          variant="accent"
          items={[
            {
              title: 'Smart reminders',
              text: 'Set your rhythm - every 30 min, hourly, or custom. Quiet hours respected.',
            },
            {
              title: 'Syncs everywhere',
              text: 'Your streak and stats stay in sync between web and desktop, automatically.',
            },
            {
              title: 'Cute, never naggy',
              text: 'A friendly pup nudges you along - gentle encouragement, zero guilt trips.',
            },
          ]}
        />
      </section>
    </PublicWrapper>
  );
}
