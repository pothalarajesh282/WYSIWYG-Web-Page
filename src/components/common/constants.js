export const ItemTypes = { TOOL: 'TOOL', NODE: 'NODE' }
export const uid = ()=> Math.random().toString(36).slice(2,9)
export const BLUEPRINTS = {
  text: ()=> ({ id: uid(), type: 'text', x: 60, y: 60, props: { html: '<p>Double-click to edit this text</p>', fontSize: 18, align: 'left' } }),
  image: ()=> ({ id: uid(), type: 'image', x: 60, y: 60, props: { src: '', alt: 'Image', width: 300, height: 180, borderRadius: 6, borderWidth: 0, borderColor: '#000' } }),
  button: ()=> ({ id: uid(), type: 'button', x: 60, y: 60, props: { label: 'Click', href: '#', size: 'md', variant:'solid', color:'blue', bgColor: '#2563eb', borderRadius: 6, borderWidth: 0, borderColor: '#000', padding: 8 } }),
}
