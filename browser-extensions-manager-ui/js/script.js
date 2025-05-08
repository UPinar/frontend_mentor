/*
<section class="extension-cards-section">
  <section class="extension-card">
    <section class="extension-card-header-section">
      <img
        src="../assets/images/logo-devlens.svg"
        alt="logo of devlens extension"
        width="60"
        height="60"
      />
      <h3 class="text-preset-2">DevLens</h3>
      <p class="text-preset-5">
        Quickly insepect page layouts and visualize element boundaries.
      </p>
    </section>
    <section class="extension-card-activation-section">
      <button
        type="button"
        class="extension-card-remove-button text-preset-6"
      >
        Remove
      </button>
      <div class="extension-card-activate-button deactive">
        <div class="extension-card-circle"></div>
      </div>
    </section>
  </section>
</section>
*/

function fetch_data_and_create_cards()
{
  fetch('../js/data.json')
    .then(response => response.json())
    .then(json_data => {
      const extension_card_section = document.querySelector('.extension-cards-section');
  
      json_data.forEach(each_data => {
  
        const extension_card = document.createElement('section');
        extension_card.classList.add('extension-card');
  
        // <------------ HEADER SECTION ------------>
  
        const extension_card_header_section = document.createElement('section');
        extension_card_header_section.classList.add('extension-card-header-section');
  
        const extension_card_logo_img = document.createElement('img');
        extension_card_logo_img.src = each_data.logo;
        extension_card_logo_img.alt = `logo of ${each_data.name} extension`;
        extension_card_logo_img.width = 60;
        extension_card_logo_img.height = 60;
      
  
        const extension_card_heading = document.createElement('h3');
        extension_card_heading.classList.add('text-preset-2');
        extension_card_heading.textContent = each_data.name;
  
        const extension_card_pharagraph = document.createElement('p');
        extension_card_pharagraph.classList.add('text-preset-5');
        extension_card_pharagraph.textContent = each_data.description;
  
        extension_card_header_section.appendChild(extension_card_logo_img);
        extension_card_header_section.appendChild(extension_card_heading);
        extension_card_header_section.appendChild(extension_card_pharagraph);
  
        // <------------ ACTIVATION SECTION ------------>
  
        const extension_card_activation_section = document.createElement('section');
        extension_card_activation_section.classList.add('extension-card-activation-section');
  
        const remove_button = document.createElement('button');
        remove_button.type = 'button';
        remove_button.classList.add('extension-card-remove-button', 'text-preset-6');
        remove_button.textContent = 'Remove';
  
        const activate_button = document.createElement('div');
        activate_button.classList.add('extension-card-activate-button');
  
        if (each_data.isActive === true) 
        {
          activate_button.classList.add('active');
        }
        else
        {
          activate_button.classList.add('deactive');
        }
  
        const activate_button_circle = document.createElement('div');
        activate_button_circle.classList.add('extension-card-circle');
  
        activate_button.appendChild(activate_button_circle);
  
        extension_card_activation_section.appendChild(remove_button);
        extension_card_activation_section.appendChild(activate_button);
  
        // <------------- MAIN SECTION -------->
  
        extension_card.appendChild(extension_card_header_section);
        extension_card.appendChild(extension_card_activation_section);
  
        extension_card_section.appendChild(extension_card);
      })
    });
}

fetch_data_and_create_cards();

// ---------------------------------------------
// ---------------------------------------------

const theme_icon = document.querySelector("header aside");
const body_element = document.body;

theme_icon.addEventListener("click", dark_theme_operations);
  
function dark_theme_operations()
{
  switch_dark_mode();
  change_theme_icon();
  removing_box_shadows_from_extension_list_items();
  removing_box_shadows_from_extension_cards();
}

function switch_dark_mode()
{
  body_element.classList.toggle('dark-theme');
}

function change_theme_icon()
{
  const dark_theme_svg = theme_icon.children[0];
  const light_theme_svg = theme_icon.children[1];

  if (body_element.classList.contains('dark-theme'))
  {
    dark_theme_svg.classList.remove('hidden');
    light_theme_svg.classList.add('hidden');
  }
  else
  {
    light_theme_svg.classList.remove('hidden');
    dark_theme_svg.classList.add('hidden');
  }
}

function removing_box_shadows_from_extension_list_items()
{
  const extension_list_items = document.querySelectorAll('.extension-buttons-list-item');

  if (body_element.classList.contains('dark-theme'))
  {
    for (let i = 0; i < extension_list_items.length; i++)
    {
      extension_list_items[i].style.boxShadow = 'none';
    }
  }
  else 
  {
    for (let i = 0; i < extension_list_items.length; i++)
    {
      extension_list_items[i].style.boxShadow = 'var(--CLR-EXTENSION-BUTTON-BOX-SHADOW)'
    }
  }
}

function removing_box_shadows_from_extension_cards()
{
  const extension_cards = document.querySelectorAll('.extension-card');

  if (body_element.classList.contains('dark-theme'))
  {
    for (let i = 0; i < extension_cards.length; i++)
    {
      extension_cards[i].style.boxShadow = 'none';
    }
  }
  else 
  {
    for (let i = 0; i < extension_cards.length; i++)
    {
      extension_cards[i].style.boxShadow = 'var(--CLR-CARD-BOX-SHADOW)'
    }
  }
}

// ---------------------------------------------
// ---------------------------------------------

// using bubbling to check ALL, ACTIVE OR INACTIVE buttons are clicked

const buttons_list_section = document.querySelector(".extension-buttons-section");

buttons_list_section.addEventListener('click', extension_buttons_list_clicked, false);

function extension_buttons_list_clicked(event)
{
  const target_element = event.target;

  if (target_element.tagName.toLowerCase() === 'ul')
  {
    return;
  }

  if (target_element.classList.contains('selected'))
  { 
    return;
  }

  const button_list_items = document.querySelectorAll('.extension-buttons-list-item');

  const all_button = button_list_items[0];
  const active_button = button_list_items[1];
  const inactive_button = button_list_items[2];


  if (target_element === all_button)
  {
    set_elements('All');
  }
  else if (target_element === active_button)
  {
    set_elements('Active');
  }
  else if (target_element === inactive_button)
  {
    set_elements('Inactive');
  }

  const current_selected_item = get_current_selected_item();
  current_selected_item.classList.remove('selected');
  target_element.classList.add('selected');
}

function get_current_selected_item()
{
  const button_list_items = document.querySelectorAll('.extension-buttons-list-item');

  for (let i = 0; i < button_list_items.length; i++)
  {
    if (button_list_items[i].classList.contains('selected'))
    {
      return button_list_items[i];
    }
  }
}

function set_elements(all_active_inactive)
{
  const cards_activate_buttons = document.querySelectorAll('.extension-card-activate-button');

  for (let i = 0; i < cards_activate_buttons.length; i++)
  {
    const extension_card = cards_activate_buttons[i].parentNode.parentNode;

    if (!removed_extension_cards.includes(extension_card))
    {
      if (all_active_inactive === 'All')
      {
        extension_card.style.display = 'flex';
      }
      else if (all_active_inactive === 'Active')
      {
        if (cards_activate_buttons[i].classList.contains('deactive'))
        {
          extension_card.style.display = 'none';
        }
        else 
        {
          extension_card.style.display = 'flex';
        }
      }
      else if (all_active_inactive === 'Inactive')
      {
        if (cards_activate_buttons[i].classList.contains('deactive'))
        {
          extension_card.style.display = 'flex';
        }
        else 
        {
          extension_card.style.display = 'none';
        }
      }
    }
  }
}

// ---------------------------------------------
// ---------------------------------------------

const extension_cards = document.querySelector(".extension-cards-section");

extension_cards.addEventListener('click', extension_card_clicked, false);

function extension_card_clicked(event)
{
  let target_element = event.target;

  const is_activation_button_clicked = check_activation_button_clicked(target_element);

  if (is_activation_button_clicked === true)
    return;

  const is_remove_button_clicked = check_remove_button_clicked(target_element);

  if (is_remove_button_clicked === true)
    return;
}

function check_activation_button_clicked(target_element)
{
  if (target_element.classList.contains('extension-card-activate-button'))
  {
  }
  else if (target_element.classList.contains('extension-card-circle'))
  {
    target_element = target_element.parentNode;
  }
  else
  {
    return false;
  }
    
  change_button_activation_state(target_element);

  const state_of_links = control_state_of_extension_links();

  if (state_of_links === 'Active')
  {
    set_elements('Active');
  }
  else if (state_of_links === 'Inactive')
  {
    set_elements('Inactive');
  }

  return true;
}

function change_button_activation_state(param_element)
{
  if (param_element.classList.contains('active'))
  {
    param_element.classList.remove('active');
    param_element.classList.add('deactive');

  }
  else if (param_element.classList.contains('deactive'))
  {
    param_element.classList.add('active');
    param_element.classList.remove('deactive');
  }
}

function control_state_of_extension_links()
{
  const extension_list_items = document.querySelectorAll('.extension-buttons-list-item');

  for (let i = 0; i < extension_list_items.length; i++)
  {
    if (extension_list_items[i].classList.contains('selected'))
    {
      return extension_list_items[i].innerText;
    }
  }
}

let removed_extension_cards = [];

function check_remove_button_clicked(target_element)
{
  if (target_element.classList.contains('extension-card-remove-button'))
  {
    const extension_card = target_element.parentNode.parentNode;
    extension_card.style.display = 'none';
    removed_extension_cards.push(extension_card);
  }
}

// ---------------------------------------------
// ---------------------------------------------