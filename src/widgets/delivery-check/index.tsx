import { PostalCodeChecker } from "~/features/postal-check";
import { pagePaths } from "~/shared/config";
import { useI18n } from "~/shared/i18n";
import { CtaBand } from "~/widgets/cta-band";

// The postal-code checker in a mint panel, for city and district pages. `spacing` sets the
// section's padding (drop the bottom when the next section brings its own).
export function DeliveryCheck({
  requestHref = pagePaths.start,
  spacing = "py-16 sm:py-20",
}: {
  requestHref?: string;
  spacing?: string;
}) {
  const { page } = useI18n().d.areas;
  return (
    <CtaBand
      variant="panel"
      id="delivery-check-title"
      title={page.deliveryTitle}
      text={page.deliveryLead}
      className={spacing}
      textClassName="lg:col-span-5"
    >
      <PostalCodeChecker requestHref={requestHref} className="lg:col-span-7" />
    </CtaBand>
  );
}
