const { __, setLocaleData } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	RichText,
	MediaUpload,
} = wp.editor;
const { Button } = wp.components;

registerBlockType( 'bg_better_blocks/bg_profile_block', {
	title: __( 'Example: Recipe Card (esnext)', 'bg_better_blocks' ),
	icon: 'index-card',
	category: 'layout',
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: 'h2',
		},
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		ingredients: {
			type: 'array',
			source: 'children',
			selector: '.ingredients',
		},
		instructions: {
			type: 'array',
			source: 'children',
			selector: '.steps',
		},
	},
	edit: ( props ) => {
		const {
			className,
			attributes: {
				title,
				mediaID,
				mediaURL,
				ingredients,
				instructions,
			},
			setAttributes,
		} = props;
		const onChangeTitle = ( value ) => {
			setAttributes( { title: value } );
		};

		const onSelectImage = ( media ) => {
			setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};
		const onChangeIngredients = ( value ) => {
			setAttributes( { ingredients: value } );
		};

		const onChangeInstructions = ( value ) => {
			setAttributes( { instructions: value } );
		};

		return (
			<div className={ className }>
				<RichText
					tagName="h2"
					placeholder={ __( 'Write Recipe title…', 'bg_better_blocks' ) }
					value={ title }
					onChange={ onChangeTitle }
				/>
				<div className="recipe-image">
					<MediaUpload
						onSelect={ onSelectImage }
						allowedTypes="image"
						value={ mediaID }
						render={ ( { open } ) => (
							<Button className={ mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
								{ ! mediaID ? __( 'Upload Image', 'bg_better_blocks' ) : <img src={ mediaURL } alt={ __( 'Upload Recipe Image', 'bg_better_blocks' ) } /> }
							</Button>
						) }
					/>
				</div>
				<h3>{ __( 'Ingredients', 'bg_better_blocks' ) }</h3>
				<RichText
					tagName="ul"
					multiline="li"
					placeholder={ __( 'Write a list of ingredients…', 'bg_better_blocks' ) }
					value={ ingredients }
					onChange={ onChangeIngredients }
					className="ingredients"
				/>
				<h3>{ __( 'Instructions', 'bg_better_blocks' ) }</h3>
				<RichText
					tagName="div"
					multiline="p"
					className="steps"
					placeholder={ __( 'Write the instructions…', 'bg_better_blocks' ) }
					value={ instructions }
					onChange={ onChangeInstructions }
				/>
			</div>
		);
	},
	save: ( props ) => {
		const {
			className,
			attributes: {
				title,
				mediaURL,
				ingredients,
				instructions,
			},
		} = props;
		return (
			<div className={ className }>
				<RichText.Content tagName="h2" value={ title } />

				{
					mediaURL && (
						<img className="recipe-image" src={ mediaURL } alt={ __( 'Recipe Image', 'bg_better_blocks' ) } />
					)
				}

				<RichText.Content tagName="h2" className="ingredients" value={ ingredients } />

				<RichText.Content tagName="div" className="steps" value={ instructions } />
			</div>
		);
	},
} );
