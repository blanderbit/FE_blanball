<template>
  <PolicyWrapper :contentItems="contentItems">
    <template #title>Disclaimer</template>
    <template #content>
      <p>
        This disclaimer (&#8220;Disclaimer&#8221;) sets forth the general
        guidelines, disclosures, and terms of your use of the
        <a href="https://client.blanball.com">client.blanball.com</a> website
        (&#8220;Website&#8221; or &#8220;Service&#8221;) and any of its related
        products and services (collectively, &#8220;Services&#8221;). This
        Disclaimer is a legally binding agreement between you
        (&#8220;User&#8221;, &#8220;you&#8221; or &#8220;your&#8221;) and FlumX
        (&#8220;FlumX&#8221;, &#8220;we&#8221;, &#8220;us&#8221; or
        &#8220;our&#8221;). If you are entering into this agreement on behalf of
        a business or other legal entity, you represent that you have the
        authority to bind such entity to this agreement, in which case the terms
        &#8220;User&#8221;, &#8220;you&#8221; or &#8220;your&#8221; shall refer
        to such entity. If you do not have such authority, or if you do not
        agree with the terms of this agreement, you must not accept this
        agreement and may not access and use the Website and Services. By
        accessing and using the Website and Services, you acknowledge that you
        have read, understood, and agree to be bound by the terms of this
        Disclaimer. You acknowledge that this Disclaimer is a contract between
        you and FlumX, even though it is electronic and is not physically signed
        by you, and it governs your use of the Website and Services.
      </p>
      <h2 id="representation">Representation</h2>
      <p>
        Any views or opinions represented on the Website belong solely to the
        content creators and do not represent those of people, institutions or
        organizations that FlumX or creators may or may not be associated with
        in professional or personal capacity, unless explicitly stated. Any
        views or opinions are not intended to malign any religion, ethnic group,
        club, organization, company, or individual.
      </p>
      <h2 id="content-and-postings">Content and postings</h2>
      <p>
        You may print or copy any part of the Website and Services for your
        personal or non-commercial use.
      </p>
      <p>
        You may submit new content and comment on the existing content on the
        Website. You may not impersonate any other person through the Website
        and Services. You may not post content that is defamatory, fraudulent,
        obscene, threatening, invasive of another person&#8217;s privacy rights
        or that is otherwise unlawful. You may not post content that infringes
        on the intellectual property rights of any other person or entity. You
        may not post any content that includes any computer virus or other code
        designed to disrupt, damage, or limit the functioning of any computer
        software or hardware.
      </p>
      <h2 id="reviews-and-testimonials">Reviews and testimonials</h2>
      <p>
        Testimonials are received in various forms through a variety of
        submission methods. The testimonials are not necessarily representative
        of all of those who will use Website and Services, and FlumX is not
        responsible for the opinions or comments available on the Website, and
        does not necessarily share them. All opinions expressed are strictly the
        views of the reviewers.
      </p>
      <p>
        The testimonials displayed are given verbatim except for grammatical or
        typing error corrections. Some testimonials may have been edited for
        clarity, or shortened in cases where the original testimonial included
        extraneous information of no relevance to the general public.
        Testimonials may be reviewed for authenticity before they are available
        for public viewing.
      </p>
      <h2 id="indemnification-and-warranties">
        Indemnification and warranties
      </h2>
      <p>
        While we have made every attempt to ensure that the information
        contained on the Website is correct, FlumX is not responsible for any
        errors or omissions, or for the results obtained from the use of this
        information. All information on the Website is provided &#8220;as
        is&#8221;, with no guarantee of completeness, accuracy, timeliness or of
        the results obtained from the use of this information, and without
        warranty of any kind, express or implied. In no event will FlumX, or its
        partners, employees or agents, be liable to you or anyone else for any
        decision made or action taken in reliance on the information on the
        Website, or for any consequential, special or similar damages, even if
        advised of the possibility of such damages.
      </p>
      <h2 id="changes-and-amendments">Changes and amendments</h2>
      <p>
        We reserve the right to modify this Disclaimer or its terms related to
        the Website and Services at any time at our discretion. When we do, we
        will revise the updated date at the bottom of this page. We may also
        provide notice to you in other ways at our discretion, such as through
        the contact information you have provided.
      </p>
      <p>
        An updated version of this Disclaimer will be effective immediately upon
        the posting of the revised Disclaimer unless otherwise specified. Your
        continued use of the Website and Services after the effective date of
        the revised Disclaimer (or such other act specified at that time) will
        constitute your consent to those changes.
      </p>
      <h2 id="acceptance-of-this-disclaimer">Acceptance of this disclaimer</h2>
      <p>
        You acknowledge that you have read this Disclaimer and agree to all its
        terms and conditions. By accessing and using the Website and Services
        you agree to be bound by this Disclaimer. If you do not agree to abide
        by the terms of this Disclaimer, you are not authorized to access or use
        the Website and Services.
      </p>
      <h2 id="contacting-us">Contacting us</h2>
      <p>
        If you have any questions, concerns, or complaints regarding this
        Disclaimer, we encourage you to contact us using the details below:
      </p>
      <p>
        <a
          href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#98;la&#110;&#98;a&#108;l&#46;clien&#116;&#64;&#105;t&#45;f&#108;um&#120;&#46;&#99;o&#109;"
          >&#98;&#108;a&#110;&#98;all&#46;cl&#105;ent&#64;it-&#102;&#108;&#117;&#109;&#120;.&#99;&#111;m</a
        >
      </p>
      <p>This document was last updated on April 13, 2023</p>
    </template>
  </PolicyWrapper>
</template>

<script>
import { ref, computed } from 'vue';

import PolicyWrapper from '../../components/main/policyWrapper/PolicyWrapper.vue';

import { ROUTES } from '../../router/router.const';

export default {
  components: {
    PolicyWrapper,
  },
  setup() {
    const contentItems = ref([
      'Representation',
      'Content and postings',
      'Reviews and testimonials',
      'Indemnification and warranties',
      'Changes and amendments',
      'Acceptance of this disclaimer',
      'Contacting us',
    ]);

    const privacyPolicyUrl = computed(() => {
      return `https://client.blanball.com${ROUTES.PRIVACY_POLICY.absolute}`;
    });

    return {
      contentItems,
      privacyPolicyUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/policy.scss';
</style>
