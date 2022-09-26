import Link from "next/link";

import * as S from "./HomeBillboard.styled";

export function HomeBillboard(): JSX.Element {
	return (
		<S.HomeBillboard>
			<picture>
				<source
					srcSet="/images/IndexHintergrund.webp"
					type="image/webp"
				/>
				<img alt="" src="IndexHintergrund.jpg" />
			</picture>

			<S.HomeBillboard_Foreground>
				<S.HomeBillboard_Headline>
					Brigitte-Smith.com
				</S.HomeBillboard_Headline>

				<S.HomeBillboard_Links>
					<Link href="/home/" locale="en">
						<a hrefLang="en">English</a>
					</Link>
					<S.HomeBillboard_Divider />
					<Link href="/home/" locale="de">
						<a hrefLang="de">Deutsch</a>
					</Link>
				</S.HomeBillboard_Links>
			</S.HomeBillboard_Foreground>
		</S.HomeBillboard>
	);
}