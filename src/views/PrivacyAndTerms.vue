<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="end">
					<ion-button @click="acceptPolicy">
						<ion-icon size="large" :icon="closeOutline"></ion-icon>
					</ion-button>
				</ion-buttons>
				<ion-title>
					<translate v-if="segmentRef == 'privacy'" en="Privacy Policy" ru="Политика конфиденциальности">Privacy Policy</translate>
					<translate v-else en="Terms and Conditions." ru="Правила и условия">Terms and Conditions</translate>
				</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">
						<translate v-if="segmentRef == 'privacy'" en="Privacy Policy" ru="Политика конфиденциальности" data-type="trSpan">Privacy Policy</translate>
						<translate v-else en="Terms and Conditions." ru="Правила и условия">Terms and Conditions</translate>
					</ion-title>
				</ion-toolbar>
			</ion-header>
			<div class="ion-padding" style="
				padding-bottom: 0;
			">
				<ion-segment @ionChange="segmentChange($event)" v-bind:value="segmentRef">
					<ion-segment-button value="privacy">
						<ion-label>
							<translate en="Privacy Policy" ru="Политика конфиденц...">Privacy Policy</translate>
						</ion-label>
					</ion-segment-button>
					<ion-segment-button value="terms">
						<ion-label>
							<translate en="Terms and Conditions." ru="Правила и условия">Terms and Conditions</translate>
						</ion-label>
					</ion-segment-button>
				</ion-segment>
			</div>
			<div v-if="segmentRef == 'privacy'" class="ion-padding">
				<div id="privacy_content">
					<p>
						<translate en="
				[Developer/Company name] built the SocFollowers app as
				[open source/free/freemium/ad-supported/commercial] app. " ru="
				[Разработчик/название компании] создал приложение SocFollowers как
				[open source/free/freemium/ad-supported/commercial] приложение. " data-type="trSpan"> [Developer/Company name] built the SocFollowers app as [open source/free/freemium/ad-supported/commercial] app. </translate>
						<translate en="This SERVICE is provided by
				[Developer/Company name] [at no cost] and is intended for use as
				is.
				" ru="Эта услуга предоставляется
				[разработчиком/названием компании] [бесплатно] и предназначена для использования как
				есть.
				" data-type="trSpan">This SERVICE is provided by [Developer/Company name] [at no cost] and is intended for use as is. </translate>
					</p>
					<p>
						<translate en="
				This page is used to inform visitors regarding [my/our]
				" ru="
				Эта страница используется для информирования посетителей о [my/our]
				" data-type="trSpan"> This page is used to inform visitors regarding [my/our] </translate>
						<translate en="policies with the collection, use, and disclosure of Personal
				" ru="политика в отношении сбора, использования и раскрытия персональных данных
				" data-type="trSpan">policies with the collection, use, and disclosure of Personal </translate>
						<translate en="Information if anyone decided to use [my/our] Service.
				" ru="Информация, если кто-то решил воспользоваться [моим/нашим] сервисом.
				" data-type="trSpan">Information if anyone decided to use [my/our] Service. </translate>
					</p>
					<p>
						<translate en="
				If you choose to use [my/our] Service, then you agree to
				the collection and use of information in relation to this
				policy. " ru="
				Если вы решите использовать сервис [my/our], то вы соглашаетесь на
				сбор и использование информации в связи с настоящей
				Политикой. " data-type="trSpan"> If you choose to use [my/our] Service, then you agree to the collection and use of information in relation to this policy. </translate>
						<translate en="The Personal Information that [I/We] collect is
				used for providing and improving the Service. " ru="Личная информация, которую [я/мы] собираем
				, используется для предоставления и улучшения сервиса. " data-type="trSpan">The Personal Information that [I/We] collect is used for providing and improving the Service. </translate>
						<translate en="[I/We] will not use or share your information with
				anyone except as described in this Privacy Policy.
				" ru="[Я/мы] не будем использовать или передавать вашу информацию
				кому-либо, кроме как в соответствии с настоящей Политикой конфиденциальности.
				" data-type="trSpan">[I/We] will not use or share your information with anyone except as described in this Privacy Policy. </translate>
					</p>
					<p>
						<translate en="
				The terms used in this Privacy Policy have the same meanings
				as in our Terms and Conditions, which is accessible at
				SocFollowers unless otherwise defined in this Privacy Policy.
				" ru="
				Термины, используемые в настоящей Политике конфиденциальности, имеют те же значения
				, что и в наших правилах и условиях, которые доступны на
				сайте SocFollowers, если иное не определено в настоящей Политике конфиденциальности.
				" data-type="trSpan"> The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at SocFollowers unless otherwise defined in this Privacy Policy. </translate>
					</p>
					<p><strong><translate en="Information Collection and Use" ru="Сбор и использование информации" data-type="trSpan">Information Collection and Use</translate></strong></p>
					<p>
						<translate en="
				For a better experience, while using our Service, [I/We]
				" ru="
				Для лучшего опыта при использовании нашего сервиса, [I/We]
				" data-type="trSpan"> For a better experience, while using our Service, [I/We] </translate>
						<translate en="may require you to provide us with certain personally
				identifiable information[add whatever else you collect here, e.g. users name, address, location, pictures] " ru="может потребоваться, чтобы вы предоставили нам определенную
				личную информацию[добавьте все остальное, что вы собираете здесь, например имя пользователя, адрес, местоположение, фотографии] " data-type="trSpan">may require you to provide us with certain personally identifiable information[add whatever else you collect here, e.g. users name, address, location, pictures] </translate>
						<translate en="The information that
				" ru="Информация, которая
				" data-type="trSpan">The information that </translate>
						<translate en="[I/We] request will be [retained on your device and is not collected by [me/us] in any way]/[retained by us and used as described in this privacy policy].
				" ru="Запрос [I/We] будет [сохранен на вашем устройстве и не собирается [me/us] каким-либо образом]/[сохранен нами и используется в соответствии с настоящей Политикой конфиденциальности].
				" data-type="trSpan">[I/We] request will be [retained on your device and is not collected by [me/us] in any way]/[retained by us and used as described in this privacy policy]. </translate>
					</p>
					<div>
						<p>
							<translate en="
				The app does use third party services that may collect
				information used to identify you.
				" ru="
				Приложение действительно использует сторонние сервисы, которые могут собирать
				информацию, используемую для идентификации вас.
				" data-type="trSpan"> The app does use third party services that may collect information used to identify you. </translate>
						</p>
						<p>
							<translate en="
				Link to privacy policy of third party service providers used
				by the app
				" ru="
				Ссылка на политику конфиденциальности сторонних поставщиков услуг, используемых
				приложением
				" data-type="trSpan"> Link to privacy policy of third party service providers used by the app </translate>
						</p>
						<ul>
							<li>
								<a href="https://www.google.com/policies/privacy/" target="_blank" rel="noopener noreferrer">
									<translate en="Google Play Services" ru="Сервисы Google Play" data-type="trSpan">Google Play Services</translate>
								</a>
							</li>
							<li><a href="https://support.google.com/admob/answer/6128543?hl=en" target="_blank" rel="noopener noreferrer">AdMob</a></li>
						</ul>
					</div>
					<p><strong><translate en="Log Data" ru="Данные Журнала" data-type="trSpan">Log Data</translate></strong></p>
					<p>
						<translate en="
				[I/We] want to inform you that whenever you
				use [my/our] Service, in a case of an error in the app
				" ru="
				[Я/мы] хотим сообщить вам, что всякий раз, когда вы
				используете [мой/наш] сервис, в случае ошибки в приложении
				" data-type="trSpan"> [I/We] want to inform you that whenever you use [my/our] Service, in a case of an error in the app </translate>
						<translate en="[I/We] collect data and information (through third party
				products) on your phone called Log Data. " ru="[I/We] собирает данные и информацию (через сторонние
				продукты) на вашем телефоне под названием Log Data. " data-type="trSpan">[I/We] collect data and information (through third party products) on your phone called Log Data. </translate>
						<translate en="This Log Data may
				include information such as your device Internet Protocol
				" ru="Эти данные журнала могут
				включать в себя такую информацию, как Интернет-протокол вашего устройства
				" data-type="trSpan">This Log Data may include information such as your device Internet Protocol </translate>
						<translate en="(“IP”) address, device name, operating system version, the
				configuration of the app when utilizing [my/our] Service,
				the time and date of your use of the Service, and other
				" ru="(“IP”) адрес, имя устройства, версия операционной системы,
				конфигурация приложения при использовании сервиса [my/our],
				время и дата вашего использования сервиса и другие данные.
				" data-type="trSpan">(“IP”) address, device name, operating system version, the configuration of the app when utilizing [my/our] Service, the time and date of your use of the Service, and other </translate>
						<translate en=" statistics.
				" ru=" Статистика.
				" data-type="trSpan"> statistics. </translate>
					</p>
					<p><strong><translate en="Cookies" ru="Файлы cookie" data-type="trSpan">Cookies</translate></strong></p>
					<p>
						<translate en="
				Cookies are files with a small amount of data that are
				commonly used as anonymous unique identifiers. " ru="
				Файлы cookie-это файлы с небольшим объемом данных, которые
				обычно используются в качестве анонимных уникальных идентификаторов. " data-type="trSpan"> Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. </translate>
						<translate en="These are sent
				to your browser from the websites that you visit and are
				stored on your device's internal memory.
				" ru="Они отправляются
				в ваш браузер с веб-сайтов, которые вы посещаете, и
				хранятся во внутренней памяти вашего устройства.
				" data-type="trSpan">These are sent to your browser from the websites that you visit and are stored on your device's internal memory. </translate>
					</p>
					<p>
						<translate en="
				This Service does not use these “cookies” explicitly. " ru="
				Этот сервис явно не использует эти “файлы cookie”. " data-type="trSpan"> This Service does not use these “cookies” explicitly. </translate>
						<translate en="However,
				the app may use third party code and libraries that use
				“cookies” to collect information and improve their services.
				" ru="Однако
				приложение может использовать сторонний код и библиотеки, которые используют
				“файлы cookie” для сбора информации и улучшения своих услуг.
				" data-type="trSpan">However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. </translate>
						<translate en="You have the option to either accept or refuse these cookies
				and know when a cookie is being sent to your device. " ru="У вас есть возможность либо принять, либо отказаться от этих
				файлов cookie и знать, когда они будут отправлены на ваше устройство. " data-type="trSpan">You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. </translate>
						<translate en="If you
				choose to refuse our cookies, you may not be able to use some
				portions of this Service.
				" ru="Если вы
				решите отказаться от наших файлов cookie, вы не сможете использовать некоторые
				части этой услуги.
				" data-type="trSpan">If you choose to refuse our cookies, you may not be able to use some portions of this Service. </translate>
					</p>
					<p><strong><translate en="Service Providers" ru="Поставщики Услуг" data-type="trSpan">Service Providers</translate></strong></p>
					<p>
						<translate en="
				[I/We] may employ third-party companies and
				individuals due to the following reasons:
				" ru="
				[I/We] может нанимать сторонние компании и
				частных лиц по следующим причинам:
				" data-type="trSpan"> [I/We] may employ third-party companies and individuals due to the following reasons: </translate>
					</p>
					<ul>
						<li>
							<translate en="To facilitate our Service;" ru="Чтобы облегчить наше обслуживание;" data-type="trSpan">To facilitate our Service;</translate>
						</li>
						<li>
							<translate en="To provide the Service on our behalf;" ru="Предоставлять услуги от нашего имени;" data-type="trSpan">To provide the Service on our behalf;</translate>
						</li>
						<li>
							<translate en="To perform Service-related services; or" ru="Для выполнения услуг, связанных с обслуживанием; или" data-type="trSpan">To perform Service-related services; or</translate>
						</li>
						<li>
							<translate en="To assist us in analyzing how our Service is used." ru="Чтобы помочь нам в анализе того, как используется наш сервис." data-type="trSpan">To assist us in analyzing how our Service is used.</translate>
						</li>
					</ul>
					<p>
						<translate en="
				[I/We] want to inform users of this Service
				that these third parties have access to your Personal
				" ru="
				[Я/мы] хотим сообщить пользователям этой услуги
				, что эти третьи лица имеют доступ к вашим личным данным.
				" data-type="trSpan"> [I/We] want to inform users of this Service that these third parties have access to your Personal </translate>
						<translate en="Information. " ru="Информация. " data-type="trSpan">Information. </translate>
						<translate en="The reason is to perform the tasks assigned to
				them on our behalf. " ru="Причина в том, чтобы выполнять поставленные перед
				ними задачи от нашего имени. " data-type="trSpan">The reason is to perform the tasks assigned to them on our behalf. </translate>
						<translate en="However, they are obligated not to
				disclose or use the information for any other purpose.
				" ru="Однако они обязаны не
				разглашать и не использовать эту информацию в каких-либо других целях.
				" data-type="trSpan">However, they are obligated not to disclose or use the information for any other purpose. </translate>
					</p>
					<p><strong><translate en="Security" ru="Безопасность" data-type="trSpan">Security</translate></strong></p>
					<p>
						<translate en="
				[I/We] value your trust in providing us your
				" ru="
				[Я/Мы] ценим ваше доверие в предоставлении нам
				" data-type="trSpan"> [I/We] value your trust in providing us your </translate>
						<translate en="Personal Information, thus we are striving to use commercially
				acceptable means of protecting it. " ru="Таким образом, мы стремимся использовать коммерчески
				приемлемые средства защиты личной информации. " data-type="trSpan">Personal Information, thus we are striving to use commercially acceptable means of protecting it. </translate>
						<translate en="But remember that no method
				of transmission over the internet, or method of electronic
				storage is 100% secure and reliable, and [I/We] cannot
				guarantee its absolute security.
				" ru="Но помните, что ни один метод
				передачи данных через интернет или метод электронного
				хранения не является на 100% безопасным и надежным, и [я/мы] не можем
				гарантировать его абсолютную безопасность.
				" data-type="trSpan">But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and [I/We] cannot guarantee its absolute security. </translate>
					</p>
					<p><strong><translate en="Links to Other Sites" ru="Ссылки на другие сайты" data-type="trSpan">Links to Other Sites</translate></strong></p>
					<p>
						<translate en="
				This Service may contain links to other sites. " ru="
				Этот сервис может содержать ссылки на другие сайты. " data-type="trSpan"> This Service may contain links to other sites. </translate>
						<translate en="If you click on
				a third-party link, you will be directed to that site. " ru="Если вы нажмете на
				стороннюю ссылку, вы будете перенаправлены на этот сайт. " data-type="trSpan">If you click on a third-party link, you will be directed to that site. </translate>
						<translate en="Note
				that these external sites are not operated by [me/us].
				" ru="Обратите
				внимание, что эти внешние сайты не управляются [me/us].
				" data-type="trSpan">Note that these external sites are not operated by [me/us]. </translate>
						<translate en="Therefore, [I/We] strongly advise you to review the
				Privacy Policy of these websites. " ru="Поэтому [я/мы] настоятельно рекомендуем вам ознакомиться
				с политикой конфиденциальности этих веб-сайтов. " data-type="trSpan">Therefore, [I/We] strongly advise you to review the Privacy Policy of these websites. </translate>
						<translate en="[I/We] have
				no control over and assume no responsibility for the content,
				privacy policies, or practices of any third-party sites or
				services.
				" ru="[Я/мы]
				не контролируем и не несем никакой ответственности за содержание,
				политику конфиденциальности или практику любых сторонних сайтов или
				сервисов.
				" data-type="trSpan">[I/We] have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. </translate>
					</p>
					<p><strong><translate en="Children’s Privacy" ru="Конфиденциальность детей" data-type="trSpan">Children’s Privacy</translate></strong></p>
					<p>
						<translate en="
				These Services do not address anyone under the age of 13.
				" ru="
				Эти услуги не предназначены для лиц младше 13 лет.
				" data-type="trSpan"> These Services do not address anyone under the age of 13. </translate>
						<translate en="[I/We] do not knowingly collect personally
				identifiable information from children under 13 years of age. " ru="[Я/мы] сознательно не собираем
				личную информацию от детей в возрасте до 13 лет. " data-type="trSpan">[I/We] do not knowingly collect personally identifiable information from children under 13 years of age. </translate>
						<translate en="In the case
				" ru="В этом случае
				" data-type="trSpan">In the case </translate>
						<translate en="[I/We] discover that a child under 13 has provided
				" ru="[Я/мы] обнаруживаем, что ребенок в возрасте до 13 лет обеспечил
				" data-type="trSpan">[I/We] discover that a child under 13 has provided </translate>
						<translate en="[me/us] with personal information, [I/We] immediately
				delete this from our servers. " ru="[me/us] с личной информацией, [I/We] немедленно
				удалите ее с наших серверов. " data-type="trSpan">[me/us] with personal information, [I/We] immediately delete this from our servers. </translate>
						<translate en="If you are a parent or guardian
				and you are aware that your child has provided us with
				personal information, please contact [me/us] so that
				" ru="Если вы являетесь родителем или опекуном
				и вам известно, что ваш ребенок предоставил нам
				личную информацию, пожалуйста, свяжитесь с нами [me/us], чтобы
				" data-type="trSpan">If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact [me/us] so that </translate>
						<translate en=" [I/We] will be able to do necessary actions.
				" ru=" [Я/мы] сможем сделать необходимые действия.
				" data-type="trSpan"> [I/We] will be able to do necessary actions. </translate>
					</p>
					<p><strong><translate en="Changes to This Privacy Policy" ru="Изменения в настоящей Политике конфиденциальности" data-type="trSpan">Changes to This Privacy Policy</translate></strong></p>
					<p>
						<translate en="
				[I/We] may update our Privacy Policy from
				time to time. " ru="
				[I/We] может время от времени обновлять нашу политику конфиденциальности
				. " data-type="trSpan"> [I/We] may update our Privacy Policy from time to time. </translate>
						<translate en="Thus, you are advised to review this page
				periodically for any changes. " ru="Таким образом, вам рекомендуется периодически просматривать эту страницу
				на предмет любых изменений. " data-type="trSpan">Thus, you are advised to review this page periodically for any changes. </translate>
						<translate en="[I/We] will
				notify you of any changes by posting the new Privacy Policy on
				this page.
				" ru="[I/We]
				уведомит вас о любых изменениях, разместив новую Политику конфиденциальности на
				этой странице.
				" data-type="trSpan">[I/We] will notify you of any changes by posting the new Privacy Policy on this page. </translate>
					</p>
					<p>
						<translate en="This policy is effective as of 2021-03-29" ru="Эта политика действует с 2021-03-29 годов" data-type="trSpan">This policy is effective as of 2021-03-29</translate>
					</p>
					<p><strong><translate en="Contact Us" ru="Связаться с нами" data-type="trSpan">Contact Us</translate></strong></p>
					<p>
						<translate en="
				If you have any questions or suggestions about [my/our]
				" ru="
				Если у вас есть какие-либо вопросы или предложения по поводу [my/our]
				" data-type="trSpan"> If you have any questions or suggestions about [my/our] </translate>
						<translate en="Privacy Policy, do not hesitate to contact [me/us] at kirakrendelek@gmail.com.
				" ru="Политика конфиденциальности, не стесняйтесь обращаться к [me/us] по адресу kirakrendelek@gmail.com...
				" data-type="trSpan">Privacy Policy, do not hesitate to contact [me/us] at kirakrendelek@gmail.com. </translate>
					</p>
					<p>
						<translate en="This privacy policy page was created at " ru="Эта страница политики конфиденциальности была создана по адресу " data-type="trSpan">This privacy policy page was created at </translate>
						<a href="https://privacypolicytemplate.net" target="_blank" rel="noopener noreferrer">
							<translate en="privacypolicytemplate.net " ru="privacypolicytemplate.net " data-type="trSpan">privacypolicytemplate.net </translate>
						</a>
						<translate en="and modified/generated by " ru="и модифицированный/сгенерированный " data-type="trSpan">and modified/generated by </translate>
						<a href="https://app-privacy-policy-generator.nisrulz.com/" target="_blank" rel="noopener noreferrer">
							<translate en="App Privacy Policy Generator" ru="генератором Политики конфиденциальности приложения" data-type="trSpan">App Privacy Policy Generator</translate>
						</a>
					</p>
				</div>
			</div>
			<div v-else class="ion-padding">
				<p>
					<translate en="
				By downloading or using the app, these terms will
				automatically apply to you – you should make sure therefore
				that you read them carefully before using the app. " ru="
				При загрузке или использовании приложения эти условия будут
				автоматически применяться к вам – поэтому вы должны убедиться
				, что внимательно прочитали их перед использованием приложения. " data-type="trSpan"> By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. </translate>
					<translate en="You’re not
				allowed to copy, or modify the app, any part of the app, or
				our trademarks in any way. " ru="Вы не
				имеете права копировать или изменять приложение, любую его часть или
				наши товарные знаки каким-либо образом. " data-type="trSpan">You’re not allowed to copy, or modify the app, any part of the app, or our trademarks in any way. </translate>
					<translate en="You’re not allowed to attempt to
				extract the source code of the app, and you also shouldn’t try
				to translate the app into other languages, or make derivative
				" ru="Вам не разрешается пытаться
				извлечь исходный код приложения, а также не следует пытаться
				перевести приложение на другие языки или создавать производные
				" data-type="trSpan">You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages, or make derivative </translate>
					<translate en=" versions. " ru=" Версии. " data-type="trSpan"> versions. </translate>
					<translate en="The app itself, and all the trade marks, copyright,
				database rights and other intellectual property rights related
				to it, still belong to [Developer/Company name].
				" ru="Само приложение, а также все торговые марки, авторские права,
				права на базу данных и другие права интеллектуальной собственности, связанные
				с ним, по-прежнему принадлежат [разработчику/названию компании].
				" data-type="trSpan">The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to [Developer/Company name]. </translate>
				</p>
				<p>
					<translate en="
				[Developer/Company name] is committed to ensuring that the app is
				as useful and efficient as possible. " ru="
				[Разработчик/название компании] стремится к тому, чтобы приложение было
				максимально полезным и эффективным. " data-type="trSpan"> [Developer/Company name] is committed to ensuring that the app is as useful and efficient as possible. </translate>
					<translate en="For that reason, we
				reserve the right to make changes to the app or to charge for
				its services, at any time and for any reason. " ru="По этой причине мы
				оставляем за собой право вносить изменения в приложение или взимать плату за
				его услуги в любое время и по любой причине. " data-type="trSpan">For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. </translate>
					<translate en="We will never
				charge you for the app or its services without making it very
				clear to you exactly what you’re paying for.
				" ru="Мы никогда
				не будем взимать с вас плату за приложение или его услуги, не дав
				вам четко понять, за что именно вы платите.
				" data-type="trSpan">We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for. </translate>
				</p>
				<p>
					<translate en="
				The SocFollowers app stores and processes personal data that
				you have provided to us, in order to provide [my/our]
				" ru="
				Приложение SocFollowers хранит и обрабатывает персональные данные, которые
				вы нам предоставили, с целью предоставления [my/our]
				" data-type="trSpan"> The SocFollowers app stores and processes personal data that you have provided to us, in order to provide [my/our] </translate>
					<translate en="Service. " ru="Обувь для обслуживающего персонала. " data-type="trSpan">Service. </translate>
					<translate en="It’s your responsibility to keep your phone and
				access to the app secure. " ru="Вы несете ответственность за безопасность своего телефона и
				доступа к приложению. " data-type="trSpan">It’s your responsibility to keep your phone and access to the app secure. </translate>
					<translate en="We therefore recommend that you do
				not jailbreak or root your phone, which is the process of
				removing software restrictions and limitations imposed by the
				official operating system of your device. " ru="Поэтому мы рекомендуем вам
				не делать джейлбрейк или корень вашего телефона, который представляет собой процесс
				удаления программных ограничений и ограничений, наложенных
				официальной операционной системой вашего устройства. " data-type="trSpan">We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. </translate>
					<translate en="It could make your
				" ru="Это может сделать ваш
				" data-type="trSpan">It could make your </translate>
					<translate en=" phone vulnerable to malware/viruses/malicious programs,
				compromise your phone’s security features and it could mean
				that the SocFollowers app won’t work properly or at all.
				" ru=" телефон уязвим для вредоносных программ/вирусов/вредоносных программ,
				компрометирует функции безопасности вашего телефона, и это может означать
				, что приложение SocFollowers не будет работать должным образом или вообще.
				" data-type="trSpan"> phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the SocFollowers app won’t work properly or at all. </translate>
				</p>
				<div>
					<p>
						<translate en="
				The app does use third party services that declare their own
				" ru="
				Приложение действительно использует сторонние сервисы, которые объявляют свои собственные
				" data-type="trSpan"> The app does use third party services that declare their own </translate>
						<translate en="Terms and Conditions.
				" ru="Правила и условия.
				" data-type="trSpan">Terms and Conditions. </translate>
					</p>
					<p>
						<translate en="
				Link to Terms and Conditions of third party service
				providers used by the app
				" ru="
				Ссылка на условия и положения сторонних
				поставщиков услуг, используемых приложением
				" data-type="trSpan"> Link to Terms and Conditions of third party service providers used by the app </translate>
					</p>
					<ul>
						<li>
							<a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
								<translate en="Google Play Services" ru="Сервисы Google Play" data-type="trSpan">Google Play Services</translate>
							</a>
						</li>
						<li><a href="https://developers.google.com/admob/terms" target="_blank" rel="noopener noreferrer">AdMob</a></li>
					</ul>
				</div>
				<p>
					<translate en="
				You should be aware that there are certain things that
				" ru="
				Вы должны знать, что есть определенные вещи, которые
				" data-type="trSpan"> You should be aware that there are certain things that </translate>
					<translate en="[Developer/Company name] will not take responsibility for. " ru="[Разработчик/название компании] не несет ответственности за. " data-type="trSpan">[Developer/Company name] will not take responsibility for. </translate>
					<translate en="Certain
				functions of the app will require the app to have an active
				internet connection. " ru="Некоторые
				функции приложения потребуют, чтобы приложение имело активное
				подключение к интернету. " data-type="trSpan">Certain functions of the app will require the app to have an active internet connection. </translate>
					<translate en="The connection can be Wi-Fi, or provided
				by your mobile network provider, but [Developer/Company name]
				" ru="Соединение может быть Wi-Fi или предоставлено
				вашим оператором мобильной связи, но [разработчик/название компании]
				" data-type="trSpan">The connection can be Wi-Fi, or provided by your mobile network provider, but [Developer/Company name] </translate>
					<translate en="cannot take responsibility for the app not working at full
				functionality if you don’t have access to Wi-Fi, and you don’t
				" ru="вы не можете взять на себя ответственность за то, что приложение не работает в полном
				объеме, если у вас нет доступа к Wi-Fi, а у вас его нет
				" data-type="trSpan">cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t </translate>
					<translate en=" have any of your data allowance left.
				" ru=" у вас осталось какое-нибудь пособие на данные.
				" data-type="trSpan"> have any of your data allowance left. </translate>
				</p>
				<p></p>
				<p>
					<translate en="
				If you’re using the app outside of an area with Wi-Fi, you
				should remember that your terms of the agreement with your
				mobile network provider will still apply. " ru="
				Если вы используете приложение за пределами зоны с Wi-Fi, вы
				должны помнить, что ваши условия соглашения с вашим
				оператором мобильной связи будут по-прежнему применяться. " data-type="trSpan"> If you’re using the app outside of an area with Wi-Fi, you should remember that your terms of the agreement with your mobile network provider will still apply. </translate>
					<translate en="As a result, you may
				be charged by your mobile provider for the cost of data for
				the duration of the connection while accessing the app, or
				other third party charges. " ru="В результате ваш
				мобильный провайдер может взимать с вас плату за передачу данных в течение
				всего времени подключения при доступе к приложению или
				другие сборы третьих лиц. " data-type="trSpan">As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third party charges. </translate>
					<translate en="In using the app, you’re accepting
				responsibility for any such charges, including roaming data
				" ru="Используя приложение, вы принимаете на
				себя ответственность за любые такие сборы, включая роуминг данных
				" data-type="trSpan">In using the app, you’re accepting responsibility for any such charges, including roaming data </translate>
					<translate en=" charges if you use the app outside of your home territory
				(i.e. region or country) without turning off data roaming. " ru=" плата взимается, если вы используете приложение за пределами своей домашней территории
				(например, региона или страны) без отключения роуминга данных. " data-type="trSpan"> charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. </translate>
					<translate en="If
				you are not the bill payer for the device on which you’re
				using the app, please be aware that we assume that you have
				received permission from the bill payer for using the app.
				" ru="Если
				вы не являетесь плательщиком счетов за устройство, на котором вы
				используете приложение, пожалуйста, имейте в виду, что мы предполагаем, что вы
				получили разрешение от плательщика счетов на использование приложения.
				" data-type="trSpan">If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app. </translate>
				</p>
				<p>
					<translate en="
				Along the same lines, [Developer/Company name] cannot always take
				responsibility for the way you use the app i.e. You need to
				make sure that your device stays charged – if it runs out of
				battery and you can’t turn it on to avail the Service,
				" ru="
				Точно так же [разработчик/название компании] не всегда может взять
				на себя ответственность за то, как вы используете приложение, то есть вам нужно
				убедиться, что ваше устройство остается заряженным – если у него заканчивается
				батарея и вы не можете включить его, чтобы воспользоваться услугой,
				" data-type="trSpan"> Along the same lines, [Developer/Company name] cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, </translate>
					<translate en="[Developer/Company name] cannot accept responsibility.
				" ru="[Разработчик/название компании] не может принять на себя ответственность.
				" data-type="trSpan">[Developer/Company name] cannot accept responsibility. </translate>
				</p>
				<p>
					<translate en="
				With respect to [Developer/Company name]’s responsibility for your
				use of the app, when you’re using the app, it’s important to
				bear in mind that although we endeavour to ensure that it is
				updated and correct at all times, we do rely on third parties
				to provide information to us so that we can make it available
				to you. " ru="
				Что касается ответственности [разработчика/названия компании] за
				использование вами приложения, то при его использовании важно
				иметь в виду, что, хотя мы стремимся обеспечить его
				постоянное обновление и корректность, мы полагаемся на третьи стороны
				в предоставлении нам информации, чтобы мы могли сделать ее доступной
				для вас. " data-type="trSpan"> With respect to [Developer/Company name]’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavour to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. </translate>
					<translate en="[Developer/Company name] accepts no liability for any
				loss, direct or indirect, you experience as a result of
				" ru="[Разработчик/название компании] не несет ответственности за любые
				убытки, прямые или косвенные, которые вы испытываете в результате
				" data-type="trSpan">[Developer/Company name] accepts no liability for any loss, direct or indirect, you experience as a result of </translate>
					<translate en=" relying wholly on this functionality of the app.
				" ru=" полностью полагаясь на эту функциональность приложения.
				" data-type="trSpan"> relying wholly on this functionality of the app. </translate>
				</p>
				<p>
					<translate en="
				At some point, we may wish to update the app. " ru="
				В какой-то момент мы можем захотеть обновить приложение. " data-type="trSpan"> At some point, we may wish to update the app. </translate>
					<translate en="The app is
				currently available on Android &amp; iOS – the requirements for
				system(and for any additional systems we
				decide to extend the availability of the app to) may change,
				and you’ll need to download the updates if you want to keep
				using the app. " ru="Приложение
				в настоящее время доступно на Android и iOS – требования к
				системе(и для любых дополнительных систем, на которые мы
				решим расширить доступность приложения) могут измениться,
				и вам нужно будет загрузить обновления, если вы хотите продолжать
				использовать приложение. " data-type="trSpan">The app is currently available on Android &amp; iOS – the requirements for system(and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. </translate>
					<translate en="[Developer/Company name] does not promise that it
				will always update the app so that it is relevant to you
				" ru="[Разработчик/название компании] не обещает, что
				всегда будет обновлять приложение так, чтобы оно было актуально для вас
				" data-type="trSpan">[Developer/Company name] does not promise that it will always update the app so that it is relevant to you </translate>
					<translate en=" and/or works with the Android &amp; iOS version that you have
				installed on your device. " ru=" и/или работает с версией Android и iOS,
				установленной на вашем устройстве. " data-type="trSpan"> and/or works with the Android &amp; iOS version that you have installed on your device. </translate>
					<translate en="However, you promise to always
				accept updates to the application when offered to you, We may
				also wish to stop providing the app, and may terminate use of
				it at any time without giving notice of termination to you.
				" ru="Тем не менее, вы обещаете всегда
				принимать обновления приложения, когда они вам предлагаются, мы
				также можем прекратить предоставление приложения и прекратить его использование
				в любое время без уведомления вас о прекращении.
				" data-type="trSpan">However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. </translate>
					<translate en="Unless we tell you otherwise, upon any termination, (a) the
				rights and licenses granted to you in these terms will end;
				" ru="Если мы не сообщим вам об ином, то при любом расторжении договора (а)
				права и лицензии, предоставленные вам в соответствии с настоящими Условиями, прекращаются.;
				" data-type="trSpan">Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; </translate>
					<translate en=" (b) you must stop using the app, and (if needed) delete it
				from your device.
				" ru=" (б) вы должны прекратить использование приложения и (при необходимости) удалить его
				с вашего устройства.
				" data-type="trSpan"> (b) you must stop using the app, and (if needed) delete it from your device. </translate>
				</p>
				<p><strong><translate en="Changes to This Terms and Conditions" ru="Изменения в настоящих Правилах и условиях" data-type="trSpan">Changes to This Terms and Conditions</translate></strong></p>
				<p>
					<translate en="
				[I/We] may update our Terms and Conditions
				from time to time. " ru="
				[Я/мы] можем
				время от времени обновлять наши правила и условия. " data-type="trSpan"> [I/We] may update our Terms and Conditions from time to time. </translate>
					<translate en="Thus, you are advised to review this page
				periodically for any changes. " ru="Таким образом, вам рекомендуется периодически просматривать эту страницу
				на предмет любых изменений. " data-type="trSpan">Thus, you are advised to review this page periodically for any changes. </translate>
					<translate en="[I/We] will
				notify you of any changes by posting the new Terms and
				Conditions on this page.
				" ru="[Я/мы]
				уведомим вас о любых изменениях, разместив новые правила и
				условия на этой странице.
				" data-type="trSpan">[I/We] will notify you of any changes by posting the new Terms and Conditions on this page. </translate>
				</p>
				<p>
					<translate en="
				These terms and conditions are effective as of 2021-03-29
				" ru="
				Настоящие правила и условия вступают в силу с 2021-03-29 годов
				" data-type="trSpan"> These terms and conditions are effective as of 2021-03-29 </translate>
				</p>
				<p><strong><translate en="Contact Us" ru="Связаться с нами" data-type="trSpan">Contact Us</translate></strong></p>
				<p>
					<translate en="
				If you have any questions or suggestions about [my/our]
				" ru="
				Если у вас есть какие-либо вопросы или предложения по поводу [my/our]
				" data-type="trSpan"> If you have any questions or suggestions about [my/our] </translate>
					<translate en="Terms and Conditions, do not hesitate to contact [me/us]
				" ru="Правила и условия, не стесняйтесь обращаться к [me/us]
				" data-type="trSpan">Terms and Conditions, do not hesitate to contact [me/us] </translate>
					<translate en="at kirakrendelek@gmail.com.
				" ru="в kirakrendelek@gmail.com.
				" data-type="trSpan">at kirakrendelek@gmail.com. </translate>
				</p>
				<p>
					<translate en="This Terms and Conditions page was generated by " ru="Эта страница условий и положений была сгенерирована " data-type="trSpan">This Terms and Conditions page was generated by </translate>
					<a href="https://app-privacy-policy-generator.nisrulz.com/" target="_blank" rel="noopener noreferrer">
						<translate en="App Privacy Policy Generator" ru="генератором Политики конфиденциальности приложения" data-type="trSpan">App Privacy Policy Generator</translate>
					</a>
				</p>
			</div>
			<div class="ion-padding">
				<ion-button expand="full" color="success" @click="acceptPolicy">{{ $t('message.accept_and_continue') }}</ion-button>
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
	import {
		IonPage,
		IonIcon,
		IonLabel,
		IonTitle,
		IonButton,
		IonHeader,
		IonToolbar,
		IonContent,
		IonButtons,
		IonSegment,
		IonSegmentButton,
	} from '@ionic/vue';
	import Translate from '@/components/Translate.vue';
	import { closeOutline } from 'ionicons/icons';
	import { defineComponent, ref } from 'vue';
	import { useRouter } from 'vue-router';
	
	export default defineComponent({
		name: 'PrivacyAndTerms',
		components: {
			IonPage,
			IonIcon,
			IonLabel,
			IonTitle,
			IonButton,
			IonHeader,
			Translate,
			IonToolbar,
			IonContent,
			IonButtons,
			IonSegment,
			IonSegmentButton,
		},
		setup() {
			const router = useRouter();
			const segmentRef = ref('privacy');

			const acceptPolicy = () => {
				localStorage.setItem('isAcceptedPrivacyAndPerms', 1);
				router.push('/tabs/news');
			};
			const isAcceptedPrivacyAndTerms = localStorage.getItem('isAcceptedPrivacyAndPerms') ?? false;

			if (isAcceptedPrivacyAndTerms) {
				router.push('/tabs/news');
			}
			const segmentChange = (event) => segmentRef.value = event.detail.value;

			return {
				segmentRef,
				closeOutline,
				acceptPolicy,
				segmentChange,
			}
		}
	});
</script>