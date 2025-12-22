/**
 * Content validation utilities for non-technical users
 * Helps catch common mistakes in content files
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates JSON content structure
 */
export function validateJsonContent(content: any, filePath: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    // Check if content is an object
    if (typeof content !== 'object' || content === null) {
      errors.push(`${filePath}: Content must be a valid JSON object`);
      return { isValid: false, errors, warnings };
    }

    // Validate form content structure
    if (filePath.includes('formContent.json')) {
      validateFormContent(content, errors, warnings);
    }

    // Validate assets structure
    if (filePath.includes('assets.json')) {
      validateAssets(content, errors, warnings);
    }

    // Validate design tokens structure
    if (filePath.includes('designTokens.json')) {
      validateDesignTokens(content, errors, warnings);
    }

    // Validate pages.json structure
    if (filePath.includes('pages.json')) {
      validatePagesConfig(content, errors, warnings);
    }

    // Validate sections.json structure
    if (filePath.includes('sections.json')) {
      validateSectionsConfig(content, errors, warnings);
    }

  } catch (error) {
    errors.push(`${filePath}: Invalid JSON format - ${error.message}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates pages.json structure
 */
function validatePagesConfig(content: any, errors: string[], warnings: string[]): void {
  // Basic shape checks for pages.json
  const requiredRootKeys = ['iconRegistry', 'common']
  requiredRootKeys.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(content, key)) {
      errors.push(`pages.json: Missing required root key "${key}"`)
    }
  })

  // Check that common.layout has navbar/footer height configs
  const layout = content.common?.layout
  if (!layout?.navbar?.height || !layout?.footer?.height) {
    warnings.push('pages.json: common.layout.navbar.height and footer.height should be defined for consistent layout sizing')
  }

  // Check that main pages exist
  const requiredPages = ['home', 'about', 'products', 'contact']
  requiredPages.forEach((pageKey) => {
    if (!content[pageKey]) {
      warnings.push(`pages.json: Missing page configuration for "${pageKey}"`)
    } else if (!Array.isArray(content[pageKey].sections)) {
      errors.push(`pages.json: Page "${pageKey}" must define a "sections" array`)
    }
  })
}

/**
 * Validates sections.json structure
 */
function validateSectionsConfig(content: any, errors: string[], warnings: string[]): void {
  if (!Array.isArray(content)) {
    errors.push('sections.json: Root value must be an array of sections')
    return
  }

  content.forEach((section: any, index: number) => {
    const label = section?.name || `index ${index}`

    if (!section || typeof section !== 'object') {
      errors.push(`sections.json: Section at index ${index} must be an object`)
      return
    }

    if (!section.name || typeof section.name !== 'string') {
      errors.push(`sections.json: Section at index ${index} is missing a valid "name"`)
    }

    if (!Array.isArray(section.components) || section.components.length === 0) {
      errors.push(`sections.json: Section "${label}" must have a non-empty "components" array`)
    }
  })
}

/**
 * Validates form content
 */
function validateFormContent(content: any, errors: string[], warnings: string[]): void {
  // Check required sections
  const requiredSections = ['validation', 'labels', 'placeholders'];
  requiredSections.forEach(section => {
    if (!content[section]) {
      errors.push(`Missing required form section: ${section}`);
    }
  });

  // Validate common validation messages
  if (content.validation) {
    const requiredValidations = ['required', 'email'];
    requiredValidations.forEach(validation => {
      if (!content.validation[validation]) {
        warnings.push(`Missing validation message: ${validation}`);
      }
    });
  }
}

/**
 * Validates assets structure
 */
function validateAssets(content: any, errors: string[], warnings: string[]): void {
  // Check required sections
  const requiredSections = ['brand', 'icons'];
  requiredSections.forEach(section => {
    if (!content[section]) {
      errors.push(`Missing required assets section: ${section}`);
    }
  });

  // Validate brand assets
  if (content.brand) {
    const requiredBrandAssets = ['logo', 'logoAlt'];
    requiredBrandAssets.forEach(asset => {
      if (!content.brand[asset]) {
        warnings.push(`Missing brand asset: ${asset}`);
      }
    });
  }
}

/**
 * Validates design tokens
 */
function validateDesignTokens(content: any, errors: string[], warnings: string[]): void {
  // Check required sections
  const requiredSections = ['colors', 'fonts'];
  requiredSections.forEach(section => {
    if (!content[section]) {
      errors.push(`Missing required design section: ${section}`);
    }
  });

  // Validate color format
  if (content.colors?.primary) {
    Object.entries(content.colors.primary).forEach(([key, value]) => {
      if (typeof value === 'string' && !value.match(/^#[0-9A-Fa-f]{6}$/)) {
        errors.push(`Invalid color format for ${key}: ${value}. Use hex format like #FF0000`);
      }
    });
  }
}

/**
 * Validates that all referenced assets exist
 */
export function validateAssetReferences(content: any, filePath: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // This would need to be implemented with actual file system checking
  // For now, just validate the path format
  if (filePath.includes('assets.json')) {
    validateAssetPaths(content, errors, warnings);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates asset path formats
 */
function validateAssetPaths(content: any, errors: string[], warnings: string[]): void {
  function checkPaths(obj: any, path: string = '') {
    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'string' && value.startsWith('/assets/')) {
        // Check if path starts with correct format
        if (!value.match(/^\/assets\/images\/[a-zA-Z0-9\/\-\.]+\.(png|jpg|jpeg|svg|gif)$/i)) {
          warnings.push(`Suspicious asset path at ${currentPath}: ${value}`);
        }
      } else if (typeof value === 'object' && value !== null) {
        checkPaths(value, currentPath);
      }
    });
  }

  checkPaths(content);
}

/**
 * Provides helpful suggestions for common content issues
 */
export function getContentSuggestions(error: string): string[] {
  const suggestions: string[] = [];

  if (error.includes('Invalid JSON format')) {
    suggestions.push('Check for missing commas between objects');
    suggestions.push('Ensure all strings are wrapped in double quotes');
    suggestions.push('Verify all brackets and braces are properly closed');
  }

  if (error.includes('Missing required section')) {
    suggestions.push('Add the missing section to your JSON file');
    suggestions.push('Check the CONTENT_MANAGEMENT_GUIDE.md for required sections');
  }

  if (error.includes('Invalid color format')) {
    suggestions.push('Use hex color format like #FF0000 for red');
    suggestions.push('Color values should be 6 characters after the # symbol');
  }

  return suggestions;
}