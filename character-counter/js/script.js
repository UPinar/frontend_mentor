// -----------------------------------------------
// -----------------------------------------------

const header_theme_icon_section = document.querySelector(".header-theme-icon-section");
header_theme_icon_section.addEventListener("click", theme_operations);

const body_element = document.querySelector('body');

function theme_operations() 
{
  if (body_element.classList.contains('light-theme'))
  {
    theme_change_header_section_icon('DARK');
    theme_change_header_section_logo('DARK');
    theme_change_body_element_class('DARK');
  }
  else
  {
    theme_change_header_section_icon('LIGHT');
    theme_change_header_section_logo('LIGHT')
    theme_change_body_element_class('LIGHT')
  }
}

function theme_change_header_section_icon(param_theme)
{
  const light_theme_icon = header_theme_icon_section.children[0];
  const dark_theme_icon = header_theme_icon_section.children[1];

  if (param_theme === 'LIGHT')
  {
    light_theme_icon.classList.remove('hidden');
    dark_theme_icon.classList.add('hidden');
  }
  else if (param_theme === 'DARK')
  {
    light_theme_icon.classList.add('hidden');
    dark_theme_icon.classList.remove('hidden');
  }
}

function theme_change_header_section_logo(param_theme)
{
  const header_logo_section = document.querySelector('.header-logo-section');

  const light_theme_logo = header_logo_section.children[0];
  const dark_theme_logo = header_logo_section.children[1];

  if (param_theme === 'LIGHT')
  {
    light_theme_logo.classList.remove('hidden');
    dark_theme_logo.classList.add('hidden');
  }
  else if (param_theme === 'DARK')
  {
    light_theme_logo.classList.add('hidden');
    dark_theme_logo.classList.remove('hidden');
  }
}

function theme_change_body_element_class(param_theme)
{
  if (param_theme === 'LIGHT')
  {
    body_element.classList.remove('dark-theme');
    body_element.classList.add('light-theme');
  }
  else if (param_theme === 'DARK')
  {
    body_element.classList.remove('light-theme');
    body_element.classList.add('dark-theme');
  }
}

// -----------------------------------------------
// -----------------------------------------------

const text_section_textarea = document.querySelector('.text-section-textarea');
text_section_textarea.addEventListener('input', change_in_textarea);

function change_in_textarea()
{
  const text = text_section_textarea.value.trim();
  
  set_character_count(text);
  set_word_count(text);
  set_sentence_count(text);

  set_alphabet_obj_array(text);
  set_pharagraph_elements();
  create_letter_containers();

  calculate_reading_time();
}

const character_count_text = document.querySelector('.character-count');

const sentence_count_text = document.querySelector('.sentence-count');

const word_count_text = document.querySelector('.word-count');

function set_character_count(text)
{
  let character_count = text.length;

  if (exclude_space_checkbox.checked)
  {
    const space_array = text.match(/\s/g);
    let space_count = 0;

    if (space_array !== null)
    {
      space_count = space_array.length;
    }

    character_count -= space_count;
  }

  character_count_text.textContent = get_text_string(character_count);
}

function set_word_count(text)
{
  const word_array = text.split(/\s+/).filter(word => word.length > 0);
  
  const word_count = word_array.length;
  word_count_text.textContent = get_text_string(word_count);
}

function set_sentence_count(text)
{
  const sentence_array = text.split(/[.?!]+/).filter(sentence => sentence.trim().length > 0);

  const sentence_count = sentence_array.length;
  sentence_count_text.textContent = get_text_string(sentence_count);
}

function get_text_string(elem_count)
{
  if (elem_count < 10)
  {
    return `0${elem_count}`
  }
  else
  {
    return `${elem_count}`
  }
}

const alphabet_Obj_Array = [];

function create_alphabet_obj_array()
{
  const alphabet_char_count = 26;
  for (let i = 0; i < alphabet_char_count; i++)
  {
    alphabet_Obj_Array.push({
      children_no   : i + 1,
      elem_count    : 0,
      count_ratio   : 0
    });
  }
}

create_alphabet_obj_array();

function clear_alphabet_obj_array()
{
  for (let i = 0; i < alphabet_Obj_Array.length; i++)
  {
    alphabet_Obj_Array[i].elem_count = 0;
    alphabet_Obj_Array[i].count_ratio = 0;
  }

  alphabet_Obj_Array.sort((a, b) => a.children_number - b.children_number);
}

function set_alphabet_obj_array(text)
{
  clear_alphabet_obj_array();
  
  const uppercase_text = text.toUpperCase();

  for (let i = 0; i < uppercase_text.length; i++)
  {
    const char = uppercase_text[i];

    if (char >= 'A' && char <= 'Z')
    {
      const char_index = char.charCodeAt(0) - 'A'.charCodeAt(0)
      
      const elem_obj = alphabet_Obj_Array.find(obj => obj.children_no === char_index + 1);
      elem_obj.elem_count++;
    }
  }

  let total_element_count = 0;

  for (const obj of alphabet_Obj_Array)
  {
    total_element_count += obj.elem_count;
  }

  for (const obj of alphabet_Obj_Array)
  {
    obj.count_ratio = (obj.elem_count / total_element_count * 100).toFixed(2);
  }
}

function set_pharagraph_elements()
{
  const is_element_exist = alphabet_Obj_Array.some(obj => obj.elem_count !== 0)

  const element_not_exist_section = document.querySelector('.element-not-exists');

  if (is_element_exist)
  {
    element_not_exist_section.classList.add('hidden');
  }
  else
  {
    element_not_exist_section.classList.remove('hidden');
  }

  let non_zero_element_array = alphabet_Obj_Array.filter(obj => obj.elem_count !== 0);
  non_zero_element_count = non_zero_element_array.length;

  const many_element_exists_section = document.querySelector('.many-element-exists');

  if (non_zero_element_count > 4)
  {
    many_element_exists_section.classList.remove('hidden');
  }
  else
  {
    many_element_exists_section.classList.add('hidden');
  }
}

function create_letter_containers()
{
  alphabet_Obj_Array.sort((a, b) => b.elem_count - a.elem_count);

  clear_letters_containers();
  generate_letters_containers();
}

function clear_letters_containers()
{
  const letters = document.querySelectorAll('.letters');

  for (let i = 0; i < letters.length; i++)
  {
    letters[i].remove();
  }
}

function generate_letters_containers()
{
  const letters_alphabet_section = document.querySelector('.letters-alphabet-section');

  for (let i = 0; i < alphabet_Obj_Array.length; i++)
  {
    const elem_obj = alphabet_Obj_Array[i];

    if (elem_obj.elem_count !== 0)
    {
      const letters_section = document.createElement('section');
      letters_section.classList.add('letters', 'hidden');
      
      const letter_pharagraph = document.createElement('p');
      letter_pharagraph.classList.add('text-preset-4');
      letter_pharagraph.textContent = String.fromCharCode(elem_obj.children_no + 64);
      
      const letter_bar_div = document.createElement('div');
      letter_bar_div.classList.add('letter-bar');
    
      const letter_ratio_bar_div = document.createElement('div');
      letter_ratio_bar_div.classList.add('letter-ratio-bar');
      letter_ratio_bar_div.style.width = `${elem_obj.count_ratio}%`

      letter_bar_div.appendChild(letter_ratio_bar_div);

      const letter_ratio_text_pharagraph = document.createElement('p');
      letter_ratio_text_pharagraph.classList.add('letter-ratio-text', 'text-preset-4');
      letter_ratio_text_pharagraph.textContent = `${elem_obj.elem_count} (${elem_obj.count_ratio}%)`
    
      letters_section.appendChild(letter_pharagraph);
      letters_section.appendChild(letter_bar_div);
      letters_section.appendChild(letter_ratio_text_pharagraph);

      letters_alphabet_section.appendChild(letters_section);
    }
  }

  show_elements();
}


function show_elements()
{
  const many_element_exists_section = document.querySelector('.many-element-exists');

  const many_element_exist_section_p = document.querySelector('.many-element-exists p');

  if (many_element_exists_section.classList.contains('hidden'))
  {
    show_all_elements();
  }
  else if (many_element_exist_section_p.textContent === 'See more')
  {
    show_five_elements();
  }
  else if (many_element_exist_section_p.textContent === 'See less')
  {
    show_all_elements();
  }
}

function show_all_elements()
{
    const letters_alphabet_section = document.querySelector('.letters-alphabet-section');

    const children_count = letters_alphabet_section.children.length;

    for (let i = 0; i < children_count; i++)
    {
      const letter_section = document.querySelector(`.letters:nth-child(${i + 1})`);

      letter_section.classList.remove('hidden');
    }
}

function show_five_elements()
{
  const letters_alphabet_section = document.querySelector('.letters-alphabet-section');

  const children_count = letters_alphabet_section.children.length;

  for (let i = 0; i < children_count; i++)
  {
    const letter_section = document.querySelector(`.letters:nth-child(${i + 1})`);

    letter_section.classList.add('hidden');
  }

  for (let i = 0; i < 5; i++)
  {
    const letter_section = document.querySelector(`.letters:nth-child(${i + 1})`);

    letter_section.classList.remove('hidden');
  }
}

function calculate_reading_time()
{
  const reading_time_span = document.querySelector('.reading-time-span');

  const word_count = document.querySelector('.word-count').textContent;

  const reading_time_decimal = word_count / 200;
  const reading_time_int = Math.round(reading_time_decimal + 0.4999999999999);

  reading_time_span.textContent = `<${reading_time_int}minutes`
}

// -------------------------------------------
// -------------------------------------------

const many_element_exists_section = document.querySelector('.many-element-exists');
many_element_exists_section.addEventListener('click', many_element_exists_section_clicked);

function many_element_exists_section_clicked()
{
  const many_element_exist_section_p = document.querySelector('.many-element-exists p');

  if (many_element_exist_section_p.textContent === 'See more')
  {
    many_element_exist_section_p.textContent = 'See less';
    show_all_elements();
  }
  else
  {
    many_element_exist_section_p.textContent = 'See more';
    show_five_elements();
  }
}

// -----------------------------------------------
// -----------------------------------------------

const exclude_space_checkbox = document.querySelector('.exclude_space_checkbox')
exclude_space_checkbox.addEventListener('change', exclude_space_checkbox_clicked);

function exclude_space_checkbox_clicked()
{
  const no_space_text = document.querySelector('.no-space-text');

  if (exclude_space_checkbox.checked)
  {
    no_space_text.classList.remove('not-visible');
  }
  else 
  {
    no_space_text.classList.add('not-visible');
  }

  change_in_textarea();
}

// -----------------------------------------------
// -----------------------------------------------

const character_limit_checkbox = document.querySelector('.character_limit_checkbox')
character_limit_checkbox.addEventListener('change', character_limit_checkbox_clicked);

function character_limit_checkbox_clicked()
{
  if (character_limit_checkbox.checked)
  {
    character_limit_textarea_operation('SHOW');
  }
  else
  {
    character_limit_textarea_operation('HIDE');
  }
}

function character_limit_textarea_operation(operation)
{
  const character_limit_textarea = document.querySelector('.character_limit_textarea');

  if (operation === 'SHOW')
  {
    character_limit_textarea.classList.remove('not-visible');
  }
  else if (operation === 'HIDE')
  {
    character_limit_textarea.classList.add('not-visible');
  }
}

const character_limit_textarea = document.querySelector('.character_limit_textarea');
character_limit_textarea.addEventListener('input', change_in_character_limit_textarea);

function change_in_character_limit_textarea()
{
  const text_in_textarea = text_section_textarea.value.trim();
  const total_text_count = text_in_textarea.length;

  const char_limit_information_text = document.querySelector('.character_limit_text');

  if (character_limit_textarea.value === '')
  {
    char_limit_information_text.classList.add('hidden');
    text_section_textarea.classList.remove('limit_exceeded');
  }
  if (character_limit_textarea.value > total_text_count)
  {

    char_limit_information_text.classList.remove('hidden');
    text_section_textarea.classList.add('limit_exceeded');
  }
  else
  {
    char_limit_information_text.classList.add('hidden');
  }
}

function control_character_limit_text()
{
  const character_limit_text = document.querySelector('.character_limit_text');

  character_limit_text.classList.add('hidden');
}

// -----------------------------------------------
// -----------------------------------------------