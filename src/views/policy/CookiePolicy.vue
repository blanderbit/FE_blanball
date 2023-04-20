<template>
  <PolicyWrapper :contentItems="contentItems">
    <template #title>Cookie policy</template>
    <template #content>
      <p>
        This cookie policy (&#8220;Policy&#8221;) describes what cookies are and
        how and they&#8217;re being used by the
        <a href="https://client.blanball.com">client.blanball.com</a> website
        (&#8220;Website&#8221; or &#8220;Service&#8221;) and any of its related
        products and services (collectively, &#8220;Services&#8221;). This
        Policy is a legally binding agreement between you (&#8220;User&#8221;,
        &#8220;you&#8221; or &#8220;your&#8221;) and FlumX (&#8220;FlumX&#8221;,
        &#8220;we&#8221;, &#8220;us&#8221; or &#8220;our&#8221;). If you are
        entering into this agreement on behalf of a business or other legal
        entity, you represent that you have the authority to bind such entity to
        this agreement, in which case the terms &#8220;User&#8221;,
        &#8220;you&#8221; or &#8220;your&#8221; shall refer to such entity. If
        you do not have such authority, or if you do not agree with the terms of
        this agreement, you must not accept this agreement and may not access
        and use the Website and Services. You should read this Policy so you can
        understand the types of cookies we use, the information we collect using
        cookies and how that information is used. It also describes the choices
        available to you regarding accepting or declining the use of cookies.
        For further information on how we use, store and keep your personal data
        secure, see our
        <a :href="privacyPolicyUrl">privacy policy</a>.
      </p>
      <h2 id="what-are-cookies">What are cookies?</h2>
      <p>
        Cookies are small pieces of data stored in text files that are saved on
        your computer or other devices when websites are loaded in a browser.
        They are widely used to remember you and your preferences, either for a
        single visit (through a &#8220;session cookie&#8221;) or for multiple
        repeat visits (using a &#8220;persistent cookie&#8221;).
      </p>
      <p>
        Session cookies are temporary cookies that are used during the course of
        your visit to the Website, and they expire when you close the web
        browser.
      </p>
      <p>
        Persistent cookies are used to remember your preferences within our
        Website and remain on your desktop or mobile device even after you close
        your browser or restart your computer. They ensure a consistent and
        efficient experience for you while visiting the Website and Services.
      </p>
      <p>
        Файли cookies можуть бути встановлені веб-сайтом (“перші файли cookies”) або третіми сторонами, такими як ті, які надають контент або рекламні або аналітичні послуги на веб-сайті (“файли cookies третіх сторін”). Ці треті сторони можуть впізнавати вас, коли ви відвідуєте наш веб-сайт, а також коли ви відвідуєте певні інші веб-сайти.
      </p>
      <h2 id="what-type-of-cookies-do-we-use">
        What type of cookies do we use?
      </h2>
      <p>
        Ми не використовуємо файли cookies для відстеження вашого використання інтернету або веб-сайту, для збору або зберігання ваших персональних даних або з інших причин. Однак, будь ласка, зверніть увагу, що в деяких країнах дані, такі як ідентифікатори cookies, вважаються персональною інформацією. У випадку обробки таких даних, що вважаються персональною інформацією, ми будемо обробляти ці дані відповідно до наших політик конфіденційності та cookies.
      </p>
      <h2 id="changes-and-amendments">Changes and amendments</h2>
      <p>
        Ми залишаємо за собою право в будь-який момент нашої усвідомленої волі змінювати цю політику та її умови, що стосуються веб-сайту та послуг. При внесенні змін ми зазначимо дату оновлення внизу цієї сторінки. Також ми можемо повідомляти вас про зміни іншими способами, на наш розсуд, наприклад, через контактні дані, які ви надали.
      </p>
      <p>
        Оновлена версія цієї політики набуває чинності негайно після публікації переглянутої політики, якщо інше не вказано. Ваша подальша взаємодія з веб-сайтом та послугами після дати вступу в силу переглянутої політики (або будь-якої іншої вказаної дії) свідчить про вашу згоду з внесеними змінами.
      </p>
      <h2 id="acceptance-of-this-policy">Acceptance of this policy</h2>
      <p>
        Ви підтверджуєте, що прочитали цю політику та погоджуєтеся з усіма її умовами та положеннями. Звернення до веб-сайту та послуг означає згоду з цією політикою. Якщо ви не згодні дотримуватися умов цієї політики, ви не маєте дозволу звертатися до веб-сайту та послуг або користуватися ними.
      </p>
      <h2 id="contacting-us">Contacting us</h2>
      <p>
        If you have any questions, concerns, or complaints regarding this Policy
        or the use of cookies, we encourage you to contact us using the details
        below:
      </p>
      <p>
        <a
          href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;&#98;&#108;&#97;nba&#108;&#108;.&#99;&#108;ie&#110;t&#64;&#105;t-&#102;l&#117;&#109;x&#46;&#99;&#111;&#109;"
          >&#98;la&#110;&#98;a&#108;l.c&#108;&#105;ent&#64;i&#116;&#45;flum&#120;.&#99;&#111;&#109;</a
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
      'What are cookies?',
      'What type of cookies do we use?',
      'Changes and amendments',
      'Acceptance of this policy',
      'Contacting us',
    ]);

    const privacyPolicyUrl = computed(() => {
      return `https://client.blanball.com${ROUTES.PRIVACY_POLICY.absolute}`
    })

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
